import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { FlatList, Pressable, useWindowDimensions, View, type LayoutChangeEvent, type ListRenderItemInfo } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue
} from 'react-native-reanimated'

import { useAppTheme } from '@/context/app-theme-context'
import { cn } from '@/lib/cn'

const DOT_SIZE = 8
const ACTIVE_DOT_WIDTH = 22

type CarouselRenderItemInfo<T> = {
  index: number
  item: T
  itemWidth: number
}

type CarouselProps<T> = {
  className?: string
  data: readonly T[]
  gap?: number
  initialIndex?: number
  itemWidth?: number
  keyExtractor: (item: T, index: number) => string
  maxItemWidth?: number
  onIndexChange?: (index: number) => void
  peek?: number
  renderItem: (info: CarouselRenderItemInfo<T>) => ReactNode
  showPagination?: boolean
}

export function Carousel<T>({
  className,
  data,
  gap = 16,
  initialIndex = 0,
  itemWidth,
  keyExtractor,
  maxItemWidth,
  onIndexChange,
  peek = 24,
  renderItem,
  showPagination = true
}: CarouselProps<T>) {
  const { width: windowWidth } = useWindowDimensions()
  const listRef = useRef<FlatList<T>>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const itemCount = data.length
  const safeInitialIndex = clampValue(initialIndex, 0, Math.max(itemCount - 1, 0))
  const viewportWidth = containerWidth || windowWidth
  const resolvedItemWidth =
    itemWidth ?? Math.max(0, Math.min(maxItemWidth ?? viewportWidth, viewportWidth - peek * 2))
  const snapInterval = resolvedItemWidth + gap
  const sidePadding = Math.max(0, (viewportWidth - resolvedItemWidth) / 2)
  const [activeIndex, setActiveIndex] = useState(safeInitialIndex)
  const activeIndexRef = useRef(safeInitialIndex)
  const lastSnapIntervalRef = useRef(snapInterval)
  const scrollX = useSharedValue(safeInitialIndex * snapInterval)
  const activeIndexShared = useSharedValue(safeInitialIndex)

  const commitIndexChange = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndexRef.current) {
        return
      }

      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
      onIndexChange?.(nextIndex)
    },
    [onIndexChange]
  )

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
    onMomentumEnd: (event) => {
      const nextIndex = clampValue(Math.round(event.contentOffset.x / snapInterval), 0, itemCount - 1)

      if (nextIndex === activeIndexShared.value) {
        return
      }

      activeIndexShared.value = nextIndex
      runOnJS(commitIndexChange)(nextIndex)
    }
  })

  useEffect(() => {
    if (!itemCount) {
      return
    }

    const nextIndex = clampValue(activeIndexRef.current, 0, itemCount - 1)
    const snapIntervalChanged = snapInterval !== lastSnapIntervalRef.current

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex
      activeIndexShared.value = nextIndex
      setActiveIndex(nextIndex)
      onIndexChange?.(nextIndex)
    }

    if (!snapIntervalChanged) {
      return
    }

    const nextOffset = nextIndex * snapInterval
    scrollX.value = nextOffset
    listRef.current?.scrollToOffset({ animated: false, offset: nextOffset })
    lastSnapIntervalRef.current = snapInterval
  }, [activeIndexShared, itemCount, onIndexChange, scrollX, snapInterval])

  const contentContainerStyle = useMemo(() => ({ paddingHorizontal: sidePadding }), [sidePadding])
  const itemWrapperStyle = useMemo(() => ({ width: resolvedItemWidth }), [resolvedItemWidth])

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const nextWidth = event.nativeEvent.layout.width

      if (Math.abs(nextWidth - containerWidth) > 1) {
        setContainerWidth(nextWidth)
      }
    },
    [containerWidth]
  )

  const getItemLayout = useCallback(
    (_: ArrayLike<T> | null | undefined, index: number) => ({
      index,
      length: snapInterval,
      offset: snapInterval * index
    }),
    [snapInterval]
  )

  const scrollToIndex = useCallback(
    (index: number) => {
      const nextIndex = clampValue(index, 0, itemCount - 1)

      listRef.current?.scrollToOffset({ animated: true, offset: nextIndex * snapInterval })
    },
    [itemCount, snapInterval]
  )

  const handleScrollToIndexFailed = useCallback(
    ({ index }: { index: number }) => {
      scrollToIndex(index)
    },
    [scrollToIndex]
  )

  const renderFlatListItem = useCallback(
    ({ item, index }: ListRenderItemInfo<T>) => (
      <View style={itemWrapperStyle}>{renderItem({ index, item, itemWidth: resolvedItemWidth })}</View>
    ),
    [itemWrapperStyle, renderItem, resolvedItemWidth]
  )

  const renderSeparator = useCallback(() => <View style={{ width: gap }} />, [gap])

  if (!itemCount) {
    return null
  }

  return (
    <View className={cn('gap-4', className)} onLayout={handleLayout}>
      <Animated.FlatList<T>
        ref={listRef}
        alwaysBounceHorizontal={false}
        bounces={false}
        contentContainerStyle={contentContainerStyle}
        data={data}
        decelerationRate='fast'
        disableIntervalMomentum
        directionalLockEnabled
        getItemLayout={getItemLayout}
        horizontal
        initialNumToRender={Math.min(itemCount, 3)}
        initialScrollIndex={safeInitialIndex > 0 ? safeInitialIndex : undefined}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={3}
        nestedScrollEnabled
        onScroll={scrollHandler}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        overScrollMode='never'
        removeClippedSubviews
        renderItem={renderFlatListItem}
        scrollEnabled={itemCount > 1}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'
        snapToInterval={snapInterval}
        updateCellsBatchingPeriod={16}
        windowSize={3}
      />

      {showPagination && itemCount > 1 ? (
        <CarouselPagination
          activeIndex={activeIndex}
          itemCount={itemCount}
          onPress={scrollToIndex}
          scrollX={scrollX}
          snapInterval={snapInterval}
        />
      ) : null}
    </View>
  )
}

function CarouselPagination({
  activeIndex,
  itemCount,
  onPress,
  scrollX,
  snapInterval
}: {
  activeIndex: number
  itemCount: number
  onPress: (index: number) => void
  scrollX: SharedValue<number>
  snapInterval: number
}) {
  return (
    <View className='flex-row items-center justify-center gap-2'>
      {Array.from({ length: itemCount }, (_, index) => (
        <Pressable
          accessibilityLabel={`Go to slide ${index + 1}`}
          accessibilityRole='button'
          accessibilityState={{ selected: activeIndex === index }}
          hitSlop={8}
          key={`carousel-dot-${index}`}
          onPress={() => onPress(index)}>
          <CarouselPaginationDot index={index} scrollX={scrollX} snapInterval={snapInterval} />
        </Pressable>
      ))}
    </View>
  )
}

function CarouselPaginationDot({
  index,
  scrollX,
  snapInterval
}: {
  index: number
  scrollX: SharedValue<number>
  snapInterval: number
}) {
  const { colors } = useAppTheme()
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      [(index - 1) * snapInterval, index * snapInterval, (index + 1) * snapInterval],
      [0.25, 1, 0.25],
      Extrapolation.CLAMP
    ),
    width: interpolate(
      scrollX.value,
      [(index - 1) * snapInterval, index * snapInterval, (index + 1) * snapInterval],
      [DOT_SIZE, ACTIVE_DOT_WIDTH, DOT_SIZE],
      Extrapolation.CLAMP
    )
  }))

  return (
    <Animated.View
      className='h-2 rounded-full'
      style={[{ backgroundColor: colors.textSecondary, width: DOT_SIZE }, animatedStyle]}
    />
  )
}

function clampValue(value: number, min: number, max: number) {
  'worklet'
  return Math.min(Math.max(value, min), max)
}
