import Input from 'antd/lib/input';
import Select, {SelectProps} from 'components/Select/Select';
import {Model, Search} from 'core/models';
import React, {ChangeEvent, LegacyRef} from 'react';
import './MasterTableFilter.scss';

interface MasterTableFilterProps {
  defaultValue?: any;

  name?: string;

  onChange?: (value: any) => void;
}

function MasterTableFilter(props: MasterTableFilterProps) {
  const {onChange, defaultValue, name} = props;

  const ref: LegacyRef<Input> = React.createRef<Input>();

  React.useEffect(
    () => {
      if (defaultValue !== ref.current.input.value) {
        ref.current.setValue(defaultValue);
      }
    },
    [defaultValue, ref],
  );

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange],
  );

  return (
    <Input ref={ref} name={name} defaultValue={defaultValue} onChange={handleChange}/>
  );
}

export default MasterTableFilter;

export function MasterTableObjectFilter<T extends Model, TSearch extends Search>(props: SelectProps<T, TSearch>) {
  return (
    <Select
      {...props}
      allowClear={true}
    />
  );
}
