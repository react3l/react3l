import Select from 'components/Select/Select';
import {GuidFilter, IdFilter} from 'core/filters';
import {Model} from 'core/models';
import React from 'react';
import './DropdownFilter.scss';

interface DropdownFilterProps<T extends Model> {
  filter: IdFilter | GuidFilter;

  options: T[];

  onChange?(filter: IdFilter | GuidFilter): void;
}

function DropdownFilter<T extends Model>(props: DropdownFilterProps<T>) {
  const {options, filter, onChange} = props;

  const handleChange = React.useCallback(
    (id: string | number) => {
      filter.equal = id;
      if (typeof onChange === 'function') {
        onChange(filter);
      }
    },
    [filter, onChange],
  );

  return (
    <Select
      list={options}
      value={filter.equal}
      onChange={handleChange}
      allowClear={true}
    />
  );
}

export default DropdownFilter;
