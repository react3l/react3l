import AntInput, {InputProps} from 'antd/lib/input';
import React from 'react';
import './Input.scss';

const Input = React.forwardRef(
  (props: InputProps) => {
    const {defaultValue} = props;

    const [value, setValue] = React.useState<string | number | string[]>(defaultValue);

    const ref = React.createRef<AntInput>();

    React.useEffect(
      () => {
        if (ref.current.input.value !== defaultValue) {
          setValue(defaultValue);
        }
      },
      [defaultValue, ref],
    );

    return (
      <AntInput
        ref={ref}
        {...props}
        defaultValue={value}
      />
    );
  },
);

export default Input;
