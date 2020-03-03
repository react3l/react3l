import {Model} from 'core/models';
import {ErrorMap} from 'react3l';

export class FormService {
  public getValidationStatus<T extends Model>(errors: ErrorMap<T>, field: string) {
    if (typeof errors === 'object' && errors !== null) {
      if (errors.hasOwnProperty(field)) {
        if (typeof errors[field] === 'string' && errors[field] !== '') {
          return 'error';
        }
      }
    }
    return '';
  }
}

export const formService: FormService = new FormService();
