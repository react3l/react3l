import {Model} from 'core/models';
import React from 'react';

export interface ContentTableProps<T extends Model, F extends keyof T> {
  model: T;

  setModel: (t: T) => void;

  field: F;

  onChange?: (v: T[F]) => void;
}

type ContentTableHookResult<T extends Model, F extends keyof T> = [
  T[F],
  (v: T[F]) => void,
];

export function useContentTable<T extends Model, F extends keyof T>(
  model: T,
  setModel: (t: T) => void,
  field: F,
): ContentTableHookResult<T, F> {
  const value: T[F] = model[field];

  const setValue = React.useCallback(
    (v: T[F]) => {
      setModel(Model.clone<T>({
        ...model,
        [field]: v,
      }));
    },
    [field, model, setModel],
  );

  return [value, setValue];
}
