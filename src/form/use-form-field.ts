import {Model} from '@react3l/react3l/core';
import React, {Dispatch} from 'react';
import {FormAction} from '@react3l/react3l/form/types/form-action';
import {FormActionType} from '@react3l/react3l/form/types/form-action-type';
import {FormState} from '@react3l/react3l/form/types/form-state';

export type HTMLTypingElement = HTMLInputElement | HTMLTextAreaElement;

export type FormFieldHTMLChangeHandler<T extends Model, P extends keyof T> = (event: React.ChangeEvent<HTMLTypingElement>) => void;

export type FormFieldPureChangeHandler<T extends Model, P extends keyof T> = (fieldValue: T[P]) => void;

export type FormFieldChangeHandler<T extends Model, P extends keyof T> =
  | (FormFieldHTMLChangeHandler<T, P>)
  | (FormFieldPureChangeHandler<T, P>);

export function useFormField<T extends Model, P extends keyof T, FieldType = HTMLInputElement | HTMLTextAreaElement>(
  form: FormState<T>,
  dispatch: Dispatch<FormAction<T>>,
  fieldName: P,
): [
  T[P],
  FormFieldChangeHandler<T, P>,
] {
  const value: T[P] = form.values[fieldName];

  const handleSimpleChange: FormFieldChangeHandler<T, P> = React.useCallback(
    (event: React.ChangeEvent<HTMLFormElement> | T[P]) => {
      if ('target' in event) {
        dispatch({
          type: FormActionType.simpleChange,
          fieldName,
          fieldValue: event.target.value,
        });
      } else {
        dispatch({
          type: FormActionType.simpleChange,
          fieldName,
          fieldValue: event,
        });
      }
    },
    [dispatch, fieldName],
  );

  return [
    value,
    handleSimpleChange,
  ];
}
