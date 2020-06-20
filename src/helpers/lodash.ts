import lodashDebounce from 'lodash/debounce';
import {DEBOUNCE_TIME_100} from 'config/consts';

export function debounce(fn: (...params: any[]) => any, time: number = DEBOUNCE_TIME_100) {
  return lodashDebounce(fn, time);
}

export {default as kebabCase} from 'lodash/kebabCase';

export {default as camelCase} from 'lodash/camelCase';

export {default as snakeCase} from 'lodash/snakeCase';
