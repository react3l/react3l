import {Model} from 'core';
import {FormState} from 'form/types/form-state';
import {FormValidationErrors} from 'form/types/form-validation-errors';

export async function validate<T extends Model>(form: FormState<T>): Promise<T> {
  return form.validationSchema?.validate(form.values)
    .then((response: T) => {
      return response;
    })
    .catch((error: FormValidationErrors<T>) => {
      throw error;
    });
}
