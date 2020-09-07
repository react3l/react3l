import moment, {Moment} from 'moment';
import {STANDARD_DATE_TIME_REGEX} from '@react3l/react3l/config/consts';
import {standardLocalDateTime} from '@react3l/react3l/helpers/time';

/**
 * Serialize data to a serializable object
 *
 * @param {T} data
 * @return {T}
 */
export function serialize<T>(data: T): T {
  if (typeof data === 'object' && data !== null) {
    /**
     * If data is a moment object
     */
    if (Object.prototype.hasOwnProperty.call(data, '_isAMomentObject')) {
      return standardLocalDateTime(data as any as Moment) as any as T;
    }
    /**
     * If data is an array
     */
    if (data instanceof Array) {
      return (data as any as Array<any>).map((dataContent) => serialize(dataContent)) as any as T;
    }
    /**
     * If data is just an object
     */
    return Object.fromEntries(
      Object
        .entries(data)
        .map(([key, value]) => [key, serialize(value)]),
    ) as any as T;
  }
  return data as any as T;
}

/**
 * Deserialize data to a full-featured Javascript object
 *
 * @param {T} data
 * @return {T}
 */
export function deserialize<T>(data: T): T {
  /**
   * If data is a date-time value
   */
  if (typeof data === 'string') {
    const matches: RegExpMatchArray | null = data.match(STANDARD_DATE_TIME_REGEX);
    if (matches) {
      return moment(typeof matches[4] === 'undefined' ? `${data}+00:00` : data) as any as T;
    }
  }
  if (typeof data === 'object' && data !== null) {
    /**
     * If data is an array
     */
    if (data instanceof Array) {
      return data.map((dataContent) => deserialize(dataContent)) as any as T;
    }
    /**
     * If data is just an object
     */
    // @ts-ignore
    return Object.fromEntries(
      Object
        .entries(data)
        .map(([key, value]) => [key, deserialize(value)]),
    );
  }
  return data as any as T;
}

export default {
  serialize,
  deserialize,
};
