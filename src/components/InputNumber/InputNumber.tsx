import 'components/InputNumber/InputNumber.scss';
import React, {LegacyRef} from 'react';
import classNames from 'classnames';
import {InputProps} from 'reactstrap';

function InputNumber(props: InputProps) {
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
};

export default InputNumber;
