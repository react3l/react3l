export type PrimitiveType = string | number | boolean | null | undefined;

export type Guid = string | string[];

export type Id = number | number[];

export type TypeName<T> =
  T extends Guid ? 'guid' :
    T extends Id ? 'id' :
      T extends string ? 'string' :
        T extends number ? 'number' :
          T extends boolean ? 'boolean' :
            T extends undefined ? 'undefined' :
              T extends null ? 'null' :
                T extends Date ? 'date' :
                  T extends (...params: any[]) => any ? 'function' :
                    'object';

export type SortType = 'ASC' | 'DESC' | undefined | null | boolean;

export type ErrorMap<T> = {
  [P in keyof T]: string | ErrorMap<T[P]>;
};
