import {Model} from 'react3l/core';
import {ObjectSchema} from 'yup';

export interface FormState<T extends Model> {
  values: T;

  dirty?: Partial<Record<keyof T, boolean>>;

  touched?: Partial<Record<keyof T, boolean>>;

  validationSchema?: ObjectSchema<T>;
}
