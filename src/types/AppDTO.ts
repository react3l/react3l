import type {Model} from '@react3l/react3l/core';

export declare namespace AppDTO {
  export type ErrorMap<T extends Model> = Record<
    Exclude<keyof T, 'errors'>,
    string
  >;

  export type FieldName<T extends Model> = Exclude<keyof T, 'errors' | 'key'>;

  export interface ModelWithErrorMap {
    errors?: ErrorMap<this>;
  }
}
