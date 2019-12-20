import {FormProps} from 'antd/lib/form';

export const INPUT_DEBOUNCE_TIME: number = 400;

export const BASE_URL: string = process.env.REACT_APP_BASE_URL || window.location.origin;

export const APP_TITLE: string = process.env.REACT_APP_TITLE || '';

export const MASTER_KEYS: { [key: string]: string } = {
  index: 'index',
  actions: 'actions',
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
