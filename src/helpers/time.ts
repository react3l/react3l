import {STANDARD_DATE_TIME_FORMAT} from 'config/consts';
import moment, {Moment} from 'moment';

export function standardDateTime(m: Moment | string): string {
  const date: Date = typeof m === 'string' ? new Date(m) : m.toDate();
  return moment(date.getTime() + date.getTimezoneOffset() * 60000)
    .format(STANDARD_DATE_TIME_FORMAT).split(' ').join('T') + 'Z';
}

export default {
  standardDateTime,
};
