declare module 'react3l' {
  import {Moment} from 'moment';
  import {Model} from 'core/models/Model';
  import {ModelFilter} from 'core/models';

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
    [key in keyof T]: string | ErrorMap<T[key]> | null;
  };

  export interface BatchId {
    ids: number[] | string[];
  }

  export interface ContentTableProps<T extends Model, TContent extends Model> {
    model: T;

    setModel: (t: T) => void;

    field: keyof T | string;

    onChange?: (v: TContent[]) => void;
  }

  export type FilterHandlerType<TModelFilter extends ModelFilter> = (list: any[], search?: TModelFilter) => any[];
}
