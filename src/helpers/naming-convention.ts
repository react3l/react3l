import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import {kebabCase} from 'helpers/lodash';

export type NamingConvention = 'snakeCase' | 'camelCase' | 'kebabCase';

export type TransformFunction = (key: string) => string;

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
