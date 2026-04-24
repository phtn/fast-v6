export function getInitials(text?: string) {
  if (!text) return 'XX'
  const initials = text
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return initials || 'M'
}
