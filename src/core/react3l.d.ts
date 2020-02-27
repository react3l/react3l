declare module 'react3l' {
  import {Moment} from 'moment';
  import {Model} from 'core/models/Model';

  export type Id = string | number;

  export interface JSONObject {
    [key: string]: string | number | boolean | null | undefined | JSONObject;
  }

  export interface ColumnWidths {
    [key: string]: number;
  }

  export interface LanguageKeys {
    [key: string]: any;
  }

  export interface AntSortType {
    ASC: string;

    DESC: string;
  }

  export interface FilterType<T> {
    key: keyof T | string;

    label: string;
  }

  export type PureModelData<T extends Model> = {
    [P in keyof T]: T[P] extends number ? number
      : T[P] extends string ? string
        : T[P] extends boolean ? boolean
          : T[P] extends null ? null
            : T[P] extends undefined ? undefined
              : T[P] extends Model ? T[P]
                : T[P] extends Moment ? string
                  : any;
  } | T;

  export type ErrorMap<T> = {
    [P in keyof T]: string | ErrorMap<T[P]>;
  };
}
