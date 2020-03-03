import 'components/InputNumber/InputNumber.scss';
import React, {LegacyRef, ReactText} from 'react';
import classNames from 'classnames';

function formatter(x: ReactText) {
  if (typeof x === 'string') {
    x = parser(x);
  }
  if (typeof x === 'number' && !Number.isNaN(x)) {
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

function InputNumber(props) {
  const ref: LegacyRef<HTMLInputElement> = React.useRef();

  const {
    className,
    ...restProps
  } = props;

  return (
    <input
      ref={ref}
      {...restProps}
      className={classNames('form-control form-control-sm', className)}
    />
  );
}

InputNumber.defaultProps = {
  step: 1,
  formatter,
  parser,
};

export default InputNumber;
