import 'components/AdvancedNumberFilter/AdvancedNumberFilter.scss';
import InputNumber from 'components/InputNumber/InputNumber';
import NumberRange from 'components/NumberRange/NumberRange';
import {NumberFilter} from 'core/filters';
import {debounce} from 'core/helpers/debounce';
import {FilterType} from 'react3l';
import React, {ComponentProps} from 'react';
import nameof from 'ts-nameof.macro';

export interface AdvancedNumberFilterProps extends ComponentProps<any> {
  filter: NumberFilter;

  filterType: keyof NumberFilter | string;

  onChange?(filter: NumberFilter);
}

const types: FilterType<NumberFilter>[] = NumberFilter.types();

function AdvancedNumberFilter(props: AdvancedNumberFilterProps) {
  const {
    filter,
    filterType,
    onChange,
    className,
  } = props;

  const handleSubmitChange = React.useCallback(
    () => {
      if (typeof onChange === 'function') {
        onChange(filter);
      }
    },
    [filter, onChange],
  );

  const handleChangeRange = React.useCallback(
    (range) => {
      types.forEach((type: FilterType<NumberFilter>) => {
        if (filter.hasOwnProperty(type.key)) {
          switch (type.key) {
            case nameof(filter.greaterEqual):
              filter.greaterEqual = range[0];
              break;
            case nameof(filter.lessEqual):
              filter.lessEqual = range[1];
              break;
            default:
              if (filter.hasOwnProperty(type.key)) {
                filter[type.key] = undefined;
              }
              break;
          }
        }
      });
    },
    [filter],
  );

  const handleChange = React.useCallback(
    debounce((value: number | string) => {
      filter[filterType] = value;
      if (value === '' && typeof onChange === 'function') {
        handleSubmitChange();
      }
    }),
    [filter, onChange, filterType],
  );

  if (filterType === nameof(filter.range)) {
    const numberFilterRange: [number | undefined, number | undefined] = [filter.greaterEqual, filter.lessEqual];
    return (
      <NumberRange value={numberFilterRange}
                   onChange={handleChangeRange}
      />
    );
  }
  return (
    <InputNumber defaultValue={filter[filterType] as number}
                 onChange={handleChange}
                 className={className}
                 onPressEnter={handleSubmitChange}
    />
  );
}

export default AdvancedNumberFilter;
