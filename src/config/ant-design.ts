import {FormProps} from 'antd/lib/form';
import {AntSortType} from 'react3l';

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

export const antSortType: AntSortType = {
  ASC: 'ascend',
  DESC: 'descend',
};
