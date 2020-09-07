import {Model} from '@react3l/react3l/core';

export type FormValidationErrors<T extends Model> = Partial<{
  [P in keyof T]: T[P] extends Model ? FormValidationErrors<T[P]>
    : T[P] extends Array<Model> ? Array<FormValidationErrors<T[P]>>
      : string;
}>
