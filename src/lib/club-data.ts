import { IconName } from '@/components/ui/icons'

export type ClubAccent = 'blue' | 'green' | 'amber' | 'rose' | 'slate'

export type ClubMetric = {
  accent: ClubAccent
  label: string
  value: string
  detail: string
}

export type ClubAction = {
  accent: ClubAccent
  description: string
  href: '/chat' | '/amenities' | '/concierge'
  icon: IconName
  label: string
}

export type AmenityCategory = 'all' | 'wellness' | 'dining' | 'work' | 'leisure'
export type StartCategory = 'all' | 'bubly' | 'romantic' | 'active' | 'fun' | 'happy' | 'sensational'

export type Amenity = {
  category: Exclude<AmenityCategory, 'all'>
  description: string
  floor: string
  hours: string
  name: string
  status: string
  tone: ClubAccent
}
export interface Star {
  category: Exclude<StartCategory, 'all'>
  description: string
  level: string
  rate: string
  name: string
  status: string
  likes: number
  tone: ClubAccent
  pref?: string[]
}

export type ClubEvent = {
  accent: ClubAccent
  date: string
  host: string
  location: string
  title: string
}

export type ConciergeRequest = {
  detail: string
  owner: string
  status: string
  title: string
}

export const clubMetrics: ClubMetric[] = [
  {
    accent: 'blue',
    detail: 'Next window 7:30 PM',
    label: 'Today',
    value: 'Ready'
  },
  {
    accent: 'green',
    detail: '2 guest passes available',
    label: 'Access',
    value: 'Clear'
  },
  {
    accent: 'amber',
    detail: 'Main dining, 8:15 PM',
    label: 'Reserved',
    value: '1'
  }
]

export const clubActions: ClubAction[] = [
  {
    accent: 'green',
    description: 'Open your member pass and arrival status.',
    href: '/chat',
    icon: 'chat',
    label: 'Check in'
  },
  {
    accent: 'blue',
    description: 'See availability across the house.',
    href: '/amenities',
    icon: 'home',
    label: 'Amenities'
  },
  {
    accent: 'amber',
    description: 'Arrange tables, transport, and guest needs.',
    href: '/concierge',
    icon: 'grid',
    label: 'Concierge'
  }
]

export const amenities: Amenity[] = [
  {
    category: 'dining',
    description: 'Seasonal dining room with a private counter and late seating.',
    floor: '3',
    hours: '6 PM - 12 AM',
    name: 'House Dining',
    status: '12 seats open',
    tone: 'amber'
  },
  {
    category: 'wellness',
    description: 'Thermal circuit, treatment rooms, and recovery lounge.',
    floor: '1',
    hours: '7 AM - 10 PM',
    name: 'Bathhouse',
    status: 'Quiet',
    tone: 'green'
  },
  {
    category: 'work',
    description: 'Sound-treated rooms, call booths, and staffed reception.',
    floor: '2',
    hours: '8 AM - 8 PM',
    name: 'Work Suites',
    status: '3 rooms open',
    tone: 'blue'
  },
  {
    category: 'leisure',
    description: 'Screening room, records, games, and a reserved bar.',
    floor: '4',
    hours: '4 PM - 1 AM',
    name: 'Members Lounge',
    status: 'Members only',
    tone: 'rose'
  }
]

export const stars: Star[] = [
  {
    category: 'bubly',
    description: 'Seasonal dining room with a private counter and late seating.',
    level: '3',
    rate: '6K',
    name: 'Vega',
    status: '12 seats open',
    likes: 0,
    tone: 'amber'
  },
  {
    category: 'sensational',
    description: 'Thermal circuit, treatment rooms, and recovery lounge.',
    level: '1',
    rate: '10K',
    name: 'Era',
    status: 'Quiet',
    likes: 0,
    tone: 'green'
  },
  {
    category: 'active',
    description: 'Sound-treated rooms, call booths, and staffed reception.',
    level: '2',
    rate: '8K',
    name: 'Maia',
    status: '3 rooms open',
    likes: 0,
    tone: 'blue'
  },
  {
    category: 'fun',
    description: 'Screening room, records, games, and a reserved bar.',
    level: '4',
    rate: '4K',
    name: 'Mira',
    status: 'Members only',
    likes: 0,
    tone: 'green'
  }
]

export function getAmenitySlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getAmenityBySlug(slug: string) {
  return amenities.find((amenity) => getAmenitySlug(amenity.name) === slug)
}

export const amenityCategories: { label: string; value: AmenityCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Dining', value: 'dining' },
  { label: 'Work', value: 'work' },
  { label: 'Leisure', value: 'leisure' }
]

export const clubEvents: ClubEvent[] = [
  {
    accent: 'blue',
    date: 'Tonight, 9 PM',
    host: 'Hosted by Mira Chen',
    location: 'Library bar',
    title: 'Late Table'
  },
  {
    accent: 'green',
    date: 'Thu, 7 PM',
    host: 'Sommelier selection',
    location: 'Tasting room',
    title: 'Cellar Notes'
  },
  {
    accent: 'rose',
    date: 'Fri, 8 PM',
    host: 'Private screening',
    location: 'Cinema suite',
    title: 'Members Cut'
  }
]

export const conciergeRequests: ConciergeRequest[] = [
  {
    detail: 'Window table held until 8:30 PM.',
    owner: 'Dining desk',
    status: 'Confirmed',
    title: 'Dinner for two'
  },
  {
    detail: 'Black car requested for 11:15 PM.',
    owner: 'Transport',
    status: 'In progress',
    title: 'Return pickup'
  },
  {
    detail: 'Guest pass ready at reception.',
    owner: 'Membership',
    status: 'Ready',
    title: 'Guest access'
  }
]

export const arrivalSteps = [
  'Member identity verified',
  'Guest list confirmed',
  'House rules acknowledged',
  'Reception notified'
]
