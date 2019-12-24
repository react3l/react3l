import {FormProps} from 'antd/lib/form';
import {translate} from '../helpers';

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
  ASC: 'ASC',
  DESC: 'DESC',
};

export const DEFAULT_TAKE: number = 10;
