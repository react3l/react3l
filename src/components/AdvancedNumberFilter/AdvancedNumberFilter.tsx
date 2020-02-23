import InputNumber from 'components/InputNumber/InputNumber';
import NumberRange from 'components/NumberRange/NumberRange';
import {NumberFilter} from 'core/filters';
import {debounce} from 'core/helpers';
import {Moment} from 'moment';
import React from 'react';
import nameof from 'ts-nameof.macro';
import './AdvancedNumberFilter.scss';

export interface AdvancedNumberFilterProps {
  filter: NumberFilter;

  defaultType?: string;

  onChange?(filter: NumberFilter);
}

const types: string[] = NumberFilter.types();

function AdvancedNumberFilter(props: AdvancedNumberFilterProps) {
  const {
    filter,
    defaultType,
    onChange,
  } = props;

  const [type] = React.useState<keyof NumberFilter>((defaultType ?? types[0]) as keyof NumberFilter);

  const handleChangeRange = React.useCallback(
    (range) => {
      types.forEach((type: string) => {
        if (filter.hasOwnProperty(type)) {
          switch (type) {
            case nameof(filter.greaterEqual):
              filter.greaterEqual = range[0];
              break;
            case nameof(filter.lessEqual):
              filter.lessEqual = range[1];
              break;
            default:
              if (filter.hasOwnProperty(type)) {
                filter[type] = undefined;
              }
              break;
          }
        }
      });
      if (onChange) {
        onChange({...filter});
      }
    },
    [filter, onChange],
  );

  const handleChange = React.useCallback(
    debounce((value: Moment) => {
      filter[type as any] = value;
      if (onChange) {
        onChange({...filter});
      }
    }),
    [filter, onChange, type],
  );

  if (type === nameof(filter.range)) {
    const numberFilterRange: [number | undefined, number | undefined] = [filter.greaterEqual, filter.lessEqual];
    return (
      <NumberRange value={numberFilterRange}
                   onChange={handleChangeRange}
      />
    );
  }
  return (
    <InputNumber defaultValue={filter[type] as number}
                 onChange={handleChange}
    />
  );
}

export default AdvancedNumberFilter;
