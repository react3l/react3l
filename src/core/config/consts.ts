import {FormProps} from 'antd/lib/form';
import {translate} from 'core/helpers/translate';

export const MASTER_KEYS: { [key: string]: string } = {
  index: translate('general.master.index'),
  actions: translate('general.master.actions'),
};

export const DETAIL_KEYS: { [key: string]: string } = {
  add: 'add',
};

export const formItemLayout: FormProps = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

interface SortType {
  ASC: string;

  DESC: string;
}

export const SORT_TYPES: SortType = {
  ASC: 'ascend',
  DESC: 'descend',
};

export const DEFAULT_TAKE: number = 10;

export const BASE_URL: string = process.env.REACT_APP_BASE_URL ?? '';

export const INPUT_DEBOUNCE_TIME: number = parseInt(process.env.INPUT_DEBOUNCE_TIME, 10) ?? 400;

export const DATE_FORMAT: string = 'YYYY-MM-DD';

export const TIME_FORMAT: string = 'HH:mm:ss';

export const DATE_TIME_FORMAT: string = `${DATE_FORMAT} ${TIME_FORMAT}`;
