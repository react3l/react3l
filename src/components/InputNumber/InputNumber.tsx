import AntInputNumber, {InputNumberProps} from 'antd/lib/input-number';
import React from 'react';
import './InputNumber.scss';

function InputNumber(props: InputNumberProps) {
  return (
    <AntInputNumber {...props}/>
  );
}

export default InputNumber;
