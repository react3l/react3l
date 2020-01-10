import AntInputNumber, {InputNumberProps} from 'antd/lib/input-number';
import {debounce} from 'core/helpers';
import React, {LegacyRef, ReactText} from 'react';
import './InputNumber.scss';

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
  const {defaultValue, onChange, ...restProps} = props;

  const ref: LegacyRef<any> = React.useRef();

  const [value, setValue] = React.useState<number>(defaultValue);

  React.useEffect(
    () => {
      if (typeof defaultValue === 'undefined') {
        setValue(undefined);
      }
    },
    [defaultValue],
  );

  const debouncedHandleChange = React.useCallback(
    debounce((value: number) => {
      setValue(value);
      if (typeof onChange === 'function') {
        onChange(value);
      }
    }),
    [onChange],
  );

  return (
    <AntInputNumber
      ref={ref}
      formatter={formatter}
      defaultValue={defaultValue}
      onChange={debouncedHandleChange}
      value={value}
      {...restProps}
    />
  );
}

InputNumber.defaultProps = {
  allowNegative: true,
  onlyInteger: false,
  step: 1,
};

export default InputNumber;
