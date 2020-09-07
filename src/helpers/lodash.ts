import lodashDebounce from 'lodash/debounce';
import {DEBOUNCE_TIME_100} from '@react3l/react3l/config/consts';

/**
 * Limit the number of times a function will be called in an amount of time
 *
 * @param {T} fn
 * @param {number} time
 * @return {T}
 */
export function debounce(fn: (...params: any[]) => any, time: number = DEBOUNCE_TIME_100): (...params: any[]) => any {
  return lodashDebounce(fn, time);
}

export {default as kebabCase} from 'lodash/kebabCase';

export {default as camelCase} from 'lodash/camelCase';

export {default as snakeCase} from 'lodash/snakeCase';
