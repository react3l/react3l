import lodashDebounce from 'lodash/debounce';
import {INPUT_DEBOUNCE_TIME} from '../config';

export function debounce(fn: (...params: any[]) => any, debounceTime: number = INPUT_DEBOUNCE_TIME) {
  return lodashDebounce(fn, debounceTime);
}
