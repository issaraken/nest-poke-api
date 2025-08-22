const TIME_ZONE = 'Asia/Bangkok'

export function formatToThaiTime(date: Date): string {
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: TIME_ZONE,
    hour12: false, // Use 24-hour format
  })
    .format(date)
    .replace(',', '')
}
