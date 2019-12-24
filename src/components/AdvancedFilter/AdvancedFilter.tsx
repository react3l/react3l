import Input from 'antd/lib/input';
import Select from 'components/Select/Select';
import {StringFilter} from 'core/filters';
import {FilterType} from 'core/types';
import React, {ChangeEvent} from 'react';
import './AdvancedFilter.scss';

interface AdvancedFilterProps {
  filter: StringFilter;

  defaultType?: keyof StringFilter;
}

const types: FilterType[] = StringFilter
  .types()
  .map((type: string, index: number) => {
    return {
      id: index,
      name: type,
    };
  });

function AdvancedFilter(props: AdvancedFilterProps) {
  const [type, setType] = React.useState<string>(StringFilter.types()[0]);

  const {filter, defaultType} = props;

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      filter[type] = event.target.value;
    },
    [filter, type],
  );

  const handleChangeType = React.useCallback(
    (id: number) => {
      setType(types[id].name);
    },
    [],
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
    [defaultType, handleChangeType],
  );

  return (
    <Input defaultValue={filter[type]}
           onChange={handleChange}
           addonBefore={addonBefore}
    />
  );
}

export default AdvancedFilter;
