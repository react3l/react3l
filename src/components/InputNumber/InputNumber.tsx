import 'components/InputNumber/InputNumber.scss';
import React, {LegacyRef} from 'react';
import classNames from 'classnames';
import AntInputNumber, {InputNumberProps} from 'antd/lib/input-number';

function InputNumber(props: InputNumberProps) {
  const ref: LegacyRef<AntInputNumber> = React.useRef();

  const {
    className,
    ...restProps
  } = props;

  return (
    <AntInputNumber
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
