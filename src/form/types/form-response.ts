import {FormState} from '@react3l/react3l/form/types/form-state';
import {HigherOrderBlurFunction, HigherOrderFocusFunction, HigherOrderObjectChangeHandler} from '@react3l/react3l/form/use-form';
import {Dispatch} from 'react';
import {FormAction} from '@react3l/react3l/form/types/form-action';
import {Model} from '@react3l/react3l/core';
import {FormValidationErrors} from '@react3l/react3l/form/types/form-validation-errors';

export interface FormResponse<T extends Model> {
  form: FormState<T>;

  handleFocus: HigherOrderFocusFunction<T>;

  handleBlur: HigherOrderBlurFunction<T>;

  dispatch: Dispatch<FormAction<T>>;

  handleObjectChange: HigherOrderObjectChangeHandler<T>;

  errors: FormValidationErrors<T>;
}
