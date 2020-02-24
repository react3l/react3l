import {translate} from 'core/helpers/translate';
import {AntSortType, TableKeys} from 'react3l';

export const defaultKeys: TableKeys = {
  index: translate('general.keys.index'),
  actions: translate('general.keys.actions'),
  checkbox: translate('general.keys.checkbox'),
  expand: translate('general.keys.expand'),
};

export const defaultActions = {
  add: translate('general.actions.add'),
};

export const __DEV__: boolean = process.env.NODE_ENV === 'development';

export const BASE_URL: string = __DEV__ ? window.location.origin : process.env.REACT_APP_BASE_URL;

export const APP_TITLE: string = process.env.REACT_APP_TITLE ?? '';

export const antSortType: AntSortType = {
  ASC: 'ascend',
  DESC: 'descend',
};

export const DEFAULT_TAKE: number = 10;

export const INPUT_DEBOUNCE_TIME: number = parseInt(process.env.INPUT_DEBOUNCE_TIME, 10) ?? 400;

export const DATE_FORMAT: string = 'YYYY-MM-DD';

export const TIME_FORMAT: string = 'HH:mm:ss';

export const DATE_TIME_FORMAT: string = `${DATE_FORMAT} ${TIME_FORMAT}`;
