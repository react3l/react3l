import {PrimitiveType} from 'core/primitive-type';
import moment, {Moment} from 'moment';
import {STANDARD_DATE_TIME_REGEX} from 'config/consts';
import {standardDateTime} from 'helpers/time';

export interface SerializableObject {
  [key: string]: PrimitiveType | Array<PrimitiveType | SerializableObject> | SerializableObject;
}

export type SerializedObject<T extends SerializableObject> = {
  [P in keyof T]: T[P] extends Moment ? string : T[P];
}

export function serialize<T>(data: T): T {
  if (typeof data === 'object' && data !== null) {
    /**
     * If data is a moment object
     */
    if (Object.prototype.hasOwnProperty.call(data, '_isAMomentObject')) {
      return standardDateTime(data as any as Moment) as any as T;
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
        .map(([key, value]) => [key, serialize(value)])
    ) as any as T;
  }
  return data as any as T;
}

export function deserialize<T>(data: T): T {
  /**
   * If data is a date-time value
   */
  if (typeof data === 'string' && data.match(STANDARD_DATE_TIME_REGEX)) {
    return moment(data) as any as T;
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
