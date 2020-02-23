import {Model} from 'core/models';

declare module 'react3l' {
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
}
