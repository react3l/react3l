import {translate} from 'core/helpers/translate';
import {TableKeys} from 'core/types';

export const __DEV__: boolean = process.env.NODE_ENV === 'development';

export const BASE_URL: string = __DEV__ ? window.location.origin : process.env.REACT_APP_BASE_URL;

export const APP_TITLE: string = process.env.REACT_APP_TITLE ?? '';

export const DEFAULT_TAKE: number = 10;

export const INPUT_DEBOUNCE_TIME: number = parseInt(process.env.INPUT_DEBOUNCE_TIME, 10) ?? 400;

export const DATE_FORMAT: string = 'YYYY-MM-DD';

export const TIME_FORMAT: string = 'HH:mm:ss';

export const DATE_TIME_FORMAT: string = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const defaultKeys: TableKeys = {
  index: translate('general.keys.index'),
  actions: translate('general.keys.actions'),
  checkbox: translate('general.keys.checkbox'),
  expand: translate('general.keys.expand'),
};

export const defaultActions = {
  label: translate('general.actions.label'),
  add: translate('general.actions.add'),
  filter: translate('general.actions.filter'),
  reset: translate('general.actions.reset'),
  save: translate('general.actions.save'),
  delete: translate('general.actions.delete'),
  import: translate('general.actions.import'),
  export: translate('general.actions.export'),
  search: translate('general.actions.search'),
};
