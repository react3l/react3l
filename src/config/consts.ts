export * from 'core/config';

export const INPUT_DEBOUNCE_TIME: number = 400;

export const __DEV__: boolean = process.env.NODE_ENV === 'development';

export const BASE_URL: string = __DEV__ ? window.location.origin : process.env.REACT_APP_BASE_URL;

export const APP_TITLE: string = process.env.REACT_APP_TITLE ?? '';

export const COLUMN_WIDTH = {
  index: 50,
  checkbox: 50,
  expand: 50,
  actions: 100,
};
