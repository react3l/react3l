export * from 'core/config';

export const INPUT_DEBOUNCE_TIME: number = 400;

export const BASE_URL: string = process.env.REACT_APP_BASE_URL || window.location.origin;

export const APP_TITLE: string = process.env.REACT_APP_TITLE || '';

export const COLUMN_WIDTH = {
  index: 50,
  checkbox: 50,
  expand: 50,
  actions: 150,
};
