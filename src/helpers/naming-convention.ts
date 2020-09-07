import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import {kebabCase} from '@react3l/react3l/helpers/lodash';

export type NamingConvention = 'snakeCase' | 'camelCase' | 'kebabCase';

/**
 * Naming convention transformer
 */
export type TransformFunction = (key: string) => string;

/**
 * Transform key convention of an object and all of its properties
 *
 * @param data
 * @param {NamingConvention} functionName
 * @return {any}
 */
export function transformKeys(
  data: any,
  functionName: NamingConvention = 'snakeCase',
): any {
  const transform: TransformFunction = functionName === 'snakeCase'
    ? snakeCase
    : functionName === 'kebabCase'
      ? kebabCase
      : camelCase;
  if (typeof data === 'object' && data !== null) {
    if (data instanceof Array) {
      return data?.map((content) => transformKeys(content));
    }
    return Object.fromEntries(
      Object
        .entries(data)
        .map(([key, value]) => {
          return [
            transform(key),
            value,
          ];
        }),
    );
  }
  return data;
}

export default {
  transformKeys,
};
