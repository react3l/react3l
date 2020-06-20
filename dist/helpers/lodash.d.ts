/// <reference types="lodash" />
export declare function debounce(fn: (...params: any[]) => any, time?: number): ((...params: any[]) => any) & import("lodash").Cancelable;
export { default as kebabCase } from 'lodash/kebabCase';
export { default as camelCase } from 'lodash/camelCase';
export { default as snakeCase } from 'lodash/snakeCase';
