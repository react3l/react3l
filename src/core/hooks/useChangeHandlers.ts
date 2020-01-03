import {Moment} from 'moment';
import React from 'react';
import {debounce} from '../helpers';
import {Model} from '../models';

type ChangeHandlerResult = [
  (field: string) => (value) => void,
  (field: string) => (value) => void,
  (field: string) => (value) => void,
];

export function useChangeHandlers<T extends Model>(model?: T, setModel?: (t: T) => void): ChangeHandlerResult {
  const handleSetInputValue = React.useCallback(
    (field: string, value: string | number | boolean | null | undefined) => {
      setModel(Model.clone<T>({
        ...model,
        [field]: value,
      }));
    },
    [model, setModel],
  );

  const handleDebounceInputValue = React.useCallback(
    debounce(handleSetInputValue),
    [handleSetInputValue],
  );

  const handleChangeSimpleField = React.useCallback(
    (field: string, debounce: boolean = false) => {
      return (event: React.ChangeEvent<HTMLInputElement> | number | string | boolean) => {
        if (typeof event === 'object') {
          if ('target' in event) {
            if (debounce) {
              return handleDebounceInputValue(field, event.target.value);
            }
            return handleSetInputValue(field, event.target.value);
          }
          if ('format' in event) {
            setModel(Model.clone<T>({
              ...model,
              [field]: event,
            }));
          }
        }
        if (debounce) {
          return handleDebounceInputValue(field, event);
        }
        return handleSetInputValue(field, event);
      };
    },
    [handleDebounceInputValue, handleSetInputValue, model, setModel],
  );

  const handleUpdateDateField = React.useCallback(
    (field: string) => {
      return (moment: Moment) => {
        setModel(Model.clone<T>({
          ...model,
          [field]: moment,
        }));
      };
    },
    [model, setModel],
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
    handleUpdateDateField,
  ];
}
