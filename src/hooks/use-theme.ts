import { useAppTheme } from '@/context/app-theme-context'

export function useTheme() {
  return useAppTheme().colors
}
