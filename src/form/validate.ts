import {Model} from 'react3l/core';
import {FormState} from 'react3l/form/types/form-state';
import {FormValidationErrors} from 'react3l/form/types/form-validation-errors';

export async function validate<T extends Model>(form: FormState<T>): Promise<T> {
  return form.validationSchema?.validate(form.values)
    .then((response: T) => {
      return response;
    })
    .catch((error: FormValidationErrors<T>) => {
      throw error;
    });
}
