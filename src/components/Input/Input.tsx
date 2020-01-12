import AntInput, {InputProps} from 'antd/lib/input';
import React from 'react';
import './Input.scss';

function Input(props: InputProps) {
  const {defaultValue, ...restProps} = props;

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
      {...restProps}
      defaultValue={value as string}
    />
  );
}

export default Input;
