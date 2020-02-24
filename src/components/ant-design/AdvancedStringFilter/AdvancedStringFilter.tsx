import Input from 'antd/lib/input';
import 'components/ant-design/AdvancedStringFilter/AdvancedStringFilter.scss';
import Select from 'components/ant-design/Select/Select';
import {DateFilter, GuidFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {FilterType} from 'core/types';
import React from 'react';

export interface AdvancedStringFilterProps {
  filter: StringFilter | NumberFilter | IdFilter | GuidFilter;

  defaultType?: string;

  type?: 'text' | 'number';

  className?: string;

  onChange?(filter: StringFilter | NumberFilter | IdFilter | GuidFilter);
}

function AdvancedStringFilter(props: AdvancedStringFilterProps) {
  const {filter, defaultType, onChange, type: inputType, className} = props;

  const types: FilterType[] = React.useMemo(
    () => {
      const filterClasses = [
        StringFilter,
        NumberFilter,
        IdFilter,
        GuidFilter,
        DateFilter,
      ];
      for (const FilterClass of filterClasses) {
        if (filter instanceof FilterClass) {
          return FilterClass
            .types()
            .map((type: string, index: number) => {
              return {
                id: index,
                name: type,
              };
            }) as FilterType[];
        }
      }
      return [];
    },
    [filter],
  );

  const [type, setType] = React.useState<string>(defaultType ?? types[0].name);

  const ref = React.createRef<Input>();

  const handleSubmitChange = React.useCallback(
    () => {
      const {value} = ref.current.input;
      if (value !== '') {
        filter[type] = value;
      } else {
        filter[type] = null;
      }
      if (typeof onChange === 'function') {
        onChange(filter);
      }
    },
    [filter, onChange, ref, type],
  );

  const handleCheckClear = React.useCallback(
    () => {
      const {value} = ref.current.input;
      if (value === '') {
        handleSubmitChange();
      }
    },
    [handleSubmitChange, ref],
  );

  const handleChangeType = React.useCallback(
    (id: number) => {
      setType(types[id].name);
    },
    [types],
  );

  const addonBefore = React.useMemo(
    () => {
      if (typeof defaultType === 'undefined') {
        return (
          <Select list={types}
                  onChange={handleChangeType}
          />
        );
      }
      return null;
    },
    [defaultType, handleChangeType, types],
  );

  const defaultValue = React.useMemo(
    () => {
      if (filter) {
        return filter[type];
      }
      return '';
    },
    [filter, type],
  );

  React.useEffect(
    () => {
      if (typeof defaultType === 'string' && defaultType === '') {
        ref.current.setState({
          value: '',
        });
      }
    },
    [defaultType, ref],
  );

  return (
    <Input
      ref={ref}
      type={inputType}
      defaultValue={defaultValue}
      onChange={handleCheckClear}
      onPressEnter={handleSubmitChange}
      addonBefore={addonBefore}
      className={className}
    />
  );
}

AdvancedStringFilter.defaultProps = {
  type: 'text',
};

export default AdvancedStringFilter;
