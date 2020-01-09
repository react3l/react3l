import Select, {SelectProps} from 'components/Select/Select';
import {GuidFilter, IdFilter} from 'core/filters';
import {Model, Search} from 'core/models';
import React from 'react';
import './DropdownFilter.scss';

interface DropdownFilterProps<T extends Model, TSearch extends Search> extends SelectProps<T, TSearch> {
  filter: IdFilter | GuidFilter;

  onChange?: any;
}

function DropdownFilter<T extends Model, TSearch extends Search>(props: DropdownFilterProps<T, TSearch>) {
  const {list, filter} = props;

  const onChange: (filter: IdFilter | GuidFilter) => void = props.onChange;

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
      list={list}
      value={filter?.equal}
      onChange={handleChange}
      allowClear={true}
      {...props}
    />
  );
}

export default DropdownFilter;