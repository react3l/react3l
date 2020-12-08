import {Model} from '@react3l/react3l/core';

export type FieldName<T extends Model> = Exclude<keyof T, 'errors' | 'key'>;
