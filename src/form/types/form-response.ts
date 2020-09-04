import {FormState} from 'form/types/form-state';
import {HigherOrderBlurFunction, HigherOrderFocusFunction, HigherOrderObjectChangeHandler} from 'form/use-form';
import {Dispatch} from 'react';
import {FormAction} from 'form/types/form-action';
import {Model} from 'core';
import {FormValidationErrors} from 'form/types/form-validation-errors';

export interface FormResponse<T extends Model> {
  form: FormState<T>;

  handleFocus: HigherOrderFocusFunction<T>;

  handleBlur: HigherOrderBlurFunction<T>;

  dispatch: Dispatch<FormAction<T>>;

  handleObjectChange: HigherOrderObjectChangeHandler<T>;

  errors: FormValidationErrors<T>;
}
