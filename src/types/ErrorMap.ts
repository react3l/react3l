import {Model} from '@react3l/react3l/core';

export type ErrorMap<T extends Model> = Record<
  Exclude<keyof T, 'errors'>,
  string
>;
