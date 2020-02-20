import {Model} from '../models';

export function hasError<T extends Model>(model: T, field: string): 'error' | undefined {
  if (model.errors !== null && typeof model.errors !== 'undefined') {
    if (!!model.errors[field]) {
      return 'error';
    }
  }
}
