import { Model } from 'core/model';
import { Dispatch, SetStateAction } from 'react';
import React from 'react';

export function useSpecificField<T extends Model, P extends keyof T>(
  model: T,
  setModel: Dispatch<SetStateAction<T>>,
  field: P,
): [
    (value: T[P]) => void | Promise<void>,
    (value: T[P]) => void | Promise<void>,
  ] {
  return [
    React.useCallback(
      (value: T[P]) => {
        return setModel({
          ...model,
          [field]: value,
        });
      },
      [model, setModel, field],
    ),
    React.useCallback(
      (value: T[P]) => {
        return setModel({
          ...model,
          [field]: value,
          [`${field}Id`]: (value as any)?.id,
        });
      },
      [model, setModel, field],
    ),
  ];
}
