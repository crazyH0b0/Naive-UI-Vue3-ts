import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export const dateFormat = (date: any, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs.utc(date).utcOffset(8).format(format)
}
