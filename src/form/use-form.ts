import React, {Reducer} from 'react';
import {Model} from '@react3l/react3l/core';
import {formReducer} from '@react3l/react3l/form/reducers/form-reducer';
import {FormActionType} from '@react3l/react3l/form/types/form-action-type';
import {FormAction} from '@react3l/react3l/form/types/form-action';
import {FormState} from '@react3l/react3l/form/types/form-state';
import {ObjectSchema} from 'yup';
import {FormResponse} from '@react3l/react3l/form/types/form-response';
import {useValidationTrigger} from '@react3l/react3l/form/use-validation-trigger';

export type HigherOrderFocusFunction<T extends Model> = (fieldName: keyof T) => () => void;

export type HigherOrderBlurFunction<T extends Model> = (fieldName: keyof T) => () => void;

export type HigherOrderObjectChangeHandler<T extends Model> = <P extends keyof T>(fieldName: P) => (fieldValue: T[P]) => void;

export function useForm<T extends Model>(
  ModelClass: new () => T,
  initialValue?: T,
  validationSchema?: ObjectSchema<T>,
): FormResponse<T> {
  const [form, dispatch] = React.useReducer<Reducer<FormState<T>, FormAction<T>>>(
    formReducer,
    {
      values: initialValue ?? new ModelClass(),
      dirty: {},
      touched: {},
      validationSchema,
    },
  );

  const [errors] = useValidationTrigger<T>(form);

  const handleFocus: HigherOrderFocusFunction<T> = React.useCallback(
    (fieldName: keyof T) => () => {
      dispatch({
        type: FormActionType.focus,
        fieldName,
      });
    },
    [],
  );

  const handleBlur: HigherOrderBlurFunction<T> = React.useCallback(
    (fieldName: keyof T) => () => {
      dispatch({
        type: FormActionType.blur,
        fieldName,
        validationSchema,
      });
    },
    [validationSchema],
  );

  const handleObjectChange: HigherOrderObjectChangeHandler<T> = React.useCallback(
    <P extends keyof T>(fieldName: P) => (record: T[P]) => {
      dispatch({
        type: FormActionType.objectChange,
        fieldName,
        fieldValue: record,
      });
    },
    [],
  );

  return {
    form,
    errors,
    handleFocus,
    handleBlur,
    dispatch,
    handleObjectChange,
  };
}
