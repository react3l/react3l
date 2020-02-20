import {DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT} from 'core/config';
import moment, {Moment} from 'moment';

export function formatDate(date: Date | Moment, dateFormat: string = DATE_FORMAT) {
  if ('format' in date) {
    return date.format(dateFormat);
  }
  return moment(date).format(dateFormat);
}

export function formatTime(time: Date | Moment, timeFormat: string = TIME_FORMAT) {
  if ('format' in time) {
    return time.format(timeFormat);
  }
  return moment(time).format(timeFormat);
}

export function formatDateTime(time: Date | Moment, dateTimeFormat: string = DATE_TIME_FORMAT) {
  if ('format' in time) {
    return time.format(dateTimeFormat);
  }
  return moment(time).format(dateTimeFormat);
}
