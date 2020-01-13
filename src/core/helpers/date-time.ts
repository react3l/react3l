import {DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT} from 'core/config';
import moment, {Moment} from 'moment';

export function formatDate(date: Date | Moment) {
  if ('format' in date) {
    return date.format(DATE_FORMAT);
  }
  return moment(date).format(DATE_FORMAT);
}

export function formatTime(time: Date | Moment) {
  if ('format' in time) {
    return time.format(TIME_FORMAT);
  }
  return moment(time).format(TIME_FORMAT);
}

export function formatDateTime(time: Date | Moment) {
  if ('format' in time) {
    return time.format(DATE_TIME_FORMAT);
  }
  return moment(time).format(DATE_TIME_FORMAT);
}
