import {FormProps} from 'antd/lib/form';
import {AntSortType} from 'react3l';

export const formItemLayout: FormProps = {
  labelCol: {
    xs: {span: 24}, sm: {span: 24}, md: {span: 12}, lg: {span: 8},
  }, wrapperCol: {
    xs: {span: 24}, sm: {span: 24}, md: {span: 12}, lg: {span: 16},
  },
};

export const defaultDetailFormLayout: FormProps = {
  labelCol: {
    xs: {span: 24}, sm: {span: 24}, md: {span: 12}, lg: {span: 8},
  }, wrapperCol: {
    xs: {span: 24}, sm: {span: 24}, md: {span: 12}, lg: {span: 8},
  },
};

export const antSortType: AntSortType = {
  ASC: 'ascend',
  DESC: 'descend',
};
