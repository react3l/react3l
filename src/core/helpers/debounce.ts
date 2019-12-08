import {INPUT_DEBOUNCE_TIME} from 'config/consts';
import lodashDebounce from 'lodash/debounce';

export function debounce(tFunction: (...params: any[]) => any) {
  return lodashDebounce(tFunction, INPUT_DEBOUNCE_TIME);
}
