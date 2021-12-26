import { getLocales, getTimeZone } from 'react-native-localize'

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
