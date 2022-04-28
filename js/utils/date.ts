import { getLocales, getTimeZone } from 'react-native-localize'
import { EventT } from '../types/Event'

const getLocale = (): string => {
  const preferredLocale = getLocales()[0]
  return preferredLocale.languageCode + '-' + preferredLocale.countryCode
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString(getLocale(), {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    timeZone: getTimeZone()
  })
}

export const groupEventsByDate = (
  events: EventT[]
): { title: string; data: EventT[] }[] => {
  const groups: { [key: string]: EventT[] } = {}

  const sortedEvents = [...events].sort(
    (a, b) => a.start.seconds - b.start.seconds
  )

  sortedEvents.forEach(event => {
    const formattedDate = formatDate(event.start.toDate())

    if (!groups[formattedDate]) {
      groups[formattedDate] = []
    }

    groups[formattedDate].push(event)
  })

  return Object.keys(groups).map(group => ({
    title: group,
    data: groups[group]
  }))
}
