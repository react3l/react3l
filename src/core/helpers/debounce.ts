import {INPUT_DEBOUNCE_TIME} from 'core/config/consts';
import lodashDebounce from 'lodash/debounce';

export function debounce(tFunction: (...params: any[]) => any, debounceTime: number = INPUT_DEBOUNCE_TIME) {
  return lodashDebounce(tFunction, debounceTime);
}
