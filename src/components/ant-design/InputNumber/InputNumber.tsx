import AntInputNumber, {InputNumberProps} from 'antd/lib/input-number';
import classNames from 'classnames';
import 'components/ant-design/InputNumber/InputNumber.scss';
import {debounce} from 'core/helpers';
import React, {LegacyRef, ReactText} from 'react';

function formatter(x: ReactText) {
  if (typeof x === 'string') {
    x = parser(x);
  }
  if (typeof x === 'number') {
    return x.toLocaleString();
  }
  return '';
}

function parser(x: string) {
  const result: number = parseFloat(x.split(',').join(''));
  if (Number.isNaN(result)) {
    return '';
  }
  return result;
}

function InputNumber(props: InputNumberProps) {
  const {defaultValue, onChange, className, ...restProps} = props;

  const ref: LegacyRef<any> = React.useRef();

  const [value, setValue] = React.useState<number>(defaultValue);

  React.useEffect(() => {
    if (typeof defaultValue === 'undefined') {
      setValue(undefined);
    }
  }, [defaultValue]);

  const debouncedHandleChange = React.useCallback(debounce((value: number) => {
    setValue(value);
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }), [onChange]);

  return (<AntInputNumber
    ref={ref}
    formatter={formatter}
    defaultValue={defaultValue}
    onChange={debouncedHandleChange}
    value={value}
    {...restProps}
    className={classNames('input-number', className)}
  />);
}

InputNumber.defaultProps = {
  allowNegative: true, onlyInteger: false, step: 1,
};

export default InputNumber;
