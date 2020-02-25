import {Model} from 'core/models';
import {Moment} from 'moment';

export type Guid = string | string[];

export type Id = number | number[];

export type TypeName<T> = T extends Guid ? 'guid' : T extends Id ? 'id' : T extends string ? 'string' : T extends number ? 'number' : T extends boolean ? 'boolean' : T extends undefined ? 'undefined' : T extends null ? 'null' : T extends Date ? 'date' : T extends (...params: any[]) => any ? 'function' : 'object';

export type ErrorMap<T> = {
  [P in keyof T]: string | ErrorMap<T[P]>;
};

export type PrimitiveValue = number | string | boolean;

export interface FilterType<T> {
  id?: number;

  key: keyof T | string;

  label: string;
}

export type PureModelData<T extends Model> = {
  [P in keyof T]: T[P] extends number ? number : T[P] extends string ? string : T[P] extends boolean ? boolean : T[P] extends null ? null : T[P] extends undefined ? undefined : T[P] extends Model ? T[P] : T[P] extends Moment ? string : any;
} | T;

export interface ColumnWidth {
  index?: number;

  checkbox?: number;

  expand?: number;

  actions?: number;

  [key: string]: number;
}

export interface TableKeys {
  index?: string;

  actions?: string;

  [key: string]: string;
}

export interface AntSortType {
  ASC: string;

  DESC: string;
}

export interface ContentTableProps<T extends Model, TContent extends Model> {
  model: T;

  setModel: (t: T) => void;

  field: string;

  onChange?: (v: TContent[]) => void;
}

export interface DetailParams {
  id?: string;
}

export interface BatchID {
  idList: number;
}
