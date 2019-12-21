import {debounce} from 'core/helpers/debounce';
import {Model} from 'core/models';
import React from 'react';

export function useChangeHandlers<T extends Model>(model?: T, setModel?: (t: T) => void) {
  const handleSetInputValue = React.useCallback(
    (field: string, value: string | number | null | undefined) => {
      setModel(Model.clone<T>({
        ...model,
        [field]: value,
      }));
    },
    [model, setModel],
  );

  const handleDebounceInputValue = React.useCallback(
    debounce(handleSetInputValue),
    [],
  );

  const handleChangeSimpleField = React.useCallback(
    (field: string, debounce: boolean = true) => {
      return (event) => {
        if (event && typeof event === 'object') {
          if (event.target) {
            if (debounce) {
              return handleDebounceInputValue(field, event.target.value);
            }
            return handleSetInputValue(field, event.target.value);
          }
        }
        if (typeof event === 'string' || typeof event === 'number') {
          if (debounce) {
            return handleDebounceInputValue(field, event);
          }
          return handleSetInputValue(field, event);
        }
      };
    },
    [handleDebounceInputValue, handleSetInputValue],
  );

  const handleChangeObjectField = React.useCallback(
    (field: string) => {
      return (id?: number | string | null, t?: T) => {
        setModel(Model.clone<T>({
          ...model,
          [field]: t,
          [`${field}Id`]: id,
        }));
      };
    },
    [model, setModel],
  );

  return [
    handleChangeSimpleField,
    handleChangeObjectField,
  ];
}
