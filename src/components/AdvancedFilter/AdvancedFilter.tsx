import Input from 'antd/lib/input';
import Select from 'components/Select/Select';
import {DateFilter, GuidFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {FilterType} from 'core/types';
import React from 'react';
import './AdvancedFilter.scss';

interface AdvancedFilterProps {
  filter: StringFilter | NumberFilter | IdFilter | GuidFilter;

  defaultType?: string;

  onChange?(filter: StringFilter | NumberFilter | IdFilter | GuidFilter);
}

function AdvancedFilter(props: AdvancedFilterProps) {
  const {filter, defaultType, onChange} = props;

  const types: FilterType[] = React.useMemo(
    () => {
      if (filter instanceof StringFilter) {
        return StringFilter
          .types()
          .map((type: string, index: number) => {
            return {
              id: index,
              name: type,
            };
          });
      }
      if (filter instanceof NumberFilter) {
        return NumberFilter
          .types()
          .map((type: string, index: number) => {
            return {
              id: index,
              name: type,
            };
          });
      }
      if (filter instanceof DateFilter) {
        return DateFilter
          .types()
          .map((type: string, index: number) => {
            return {
              id: index,
              name: type,
            };
          });
      }
      if (filter instanceof IdFilter) {
        return NumberFilter
          .types()
          .map((type: string, index: number) => {
            return {
              id: index,
              name: type,
            };
          });
      }
      if (filter instanceof GuidFilter) {
        return GuidFilter
          .types()
          .map((type: string, index: number) => {
            return {
              id: index,
              name: type,
            };
          });
      }
      return [];
    },
    [filter],
  );

  const [type, setType] = React.useState<string>(defaultType || types[0].name);

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
      return undefined;
    },
    [filter, type],
  );

  return (
    <Input
      ref={ref}
      defaultValue={defaultValue}
      onChange={handleCheckClear}
      onPressEnter={handleSubmitChange}
      addonBefore={addonBefore}
    />
  );
}

export default AdvancedFilter;
