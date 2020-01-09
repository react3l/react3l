import React from 'react';
import {Model} from '../models';

export interface ContentTableProps<T extends Model, TContent extends Model> {
  model: T;

  setModel: (t: T) => void;

  field: string;

  onChange?: (v: TContent[]) => void;
}

type ContentTableHookResult<TContent extends Model> = [
  TContent[],
  (v: TContent[]) => void,
  () => void,
  (id: number) => () => void,
];

export function useContentTable<T extends Model, TContent extends Model>(
  model: T,
  setModel: (t: T) => void,
  field: string,
): ContentTableHookResult<TContent> {
  const value: TContent[] = model[field];

  const setValue = React.useCallback(
    (v: TContent[]) => {
      setModel(Model.clone<T>({
        ...model,
        [field]: v,
      }));
    },
    [field, model, setModel],
  );

  const handleDelete = React.useCallback(
    (id: number) => {
      return () => {
        const newValue: TContent[] = value.filter((v: TContent) => v.id !== id);
        setValue(newValue);
      };
    },
    [value, setValue],
  );

  const handleAdd = React.useCallback(
    () => {
      if (value instanceof Array) {
        setValue([
          ...value,
          new Model() as TContent,
        ]);
      } else {
        setValue([
          new Model() as TContent,
        ]);
      }
    },
    [setValue, value],
  );

  return [value, setValue, handleAdd, handleDelete];
}
