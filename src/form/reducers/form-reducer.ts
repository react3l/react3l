import { Model } from '@react3l/react3l/core';
import { FormAction } from '@react3l/react3l/form/types/form-action';
import { FormActionType } from '@react3l/react3l/form/types/form-action-type';
import { FormState } from '@react3l/react3l/form/types/form-state';

export function formReducer<T extends Model>(state: FormState<T>, action: FormAction<T>): FormState<T> {
  switch (action.type) {
    case FormActionType.focus:
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.fieldName]: true,
        },
      };

    case FormActionType.simpleChange:
      return {
        ...state,
        values: {
          ...state.values,
          [action.fieldName]: action.fieldValue,
        },
        touched: {
          ...state.touched,
          [action.fieldName]: true,
        },
        dirty: {
          ...state.dirty,
          [action.fieldName]: true,
        },
      };

    case FormActionType.objectChange:
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.fieldName]: true,
          [Model.getIdFieldName<T>(action.fieldName)]: true,
        },
        dirty: {
          ...state.dirty,
          [action.fieldName]: true,
          [Model.getIdFieldName<T>(action.fieldName)]: true,
        },
        values: {
          ...state.values,
          [action.fieldName]: action.fieldValue,
          [Model.getIdFieldName<T>(action.fieldName)]: action.fieldValue?.id,
        },
      };

    case FormActionType.replace:
      return {
        values: action.values,
        touched: {},
        dirty: {},
      };

    default:
      return state;
  }
}
