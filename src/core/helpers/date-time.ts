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

export function isDateValue(date?: string) {
  return date?.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
}

export function isTimeValue(time?: string) {
  return time?.match(/[0-9]{2}:[0-9]{2}/);
}

export function isDateTimeValue(dateTime?: string) {
  return isDateValue(dateTime) || isTimeValue(dateTime);
}
