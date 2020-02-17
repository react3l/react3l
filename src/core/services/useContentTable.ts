import React from 'react';
import v4 from 'uuid/v4';
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
  const value: TContent[] = React.useMemo(
    () => {
      if (model[field]) {
        model[field]?.forEach((t: T) => {
          if (!t?.key) {
            if (t?.id) {
              t.key = t.id;
            } else {
              t.key = v4();
            }
          }
        });
        return model[field];
      }
      return [];
    },
    [field, model],
  );

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
      const newContent: TContent = new Model() as TContent;
      newContent.key = v4();
      if (value instanceof Array) {
        setValue([
          ...value,
          newContent,
        ]);
      } else {
        setValue([
          newContent,
        ]);
      }
    },
    [setValue, value],
  );

  return [value, setValue, handleAdd, handleDelete];
}
