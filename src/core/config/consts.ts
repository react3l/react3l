import {FormProps} from 'antd/lib/form';
import {translate} from '../helpers/translate';

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
