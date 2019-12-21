import AntInput, {InputProps} from 'antd/lib/input';
import React, {Ref} from 'react';
import './Input.scss';

const Input = React.forwardRef(
  (props: InputProps, ref: Ref<AntInput>) => {
    const {defaultValue} = props;

    return (
      <AntInput
        ref={ref}
        {...props}
        defaultValue={defaultValue}
      />
    );
  },
);

export default Input;
