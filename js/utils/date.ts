export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-UK', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric'
  })
}
