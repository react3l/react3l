import DatePicker from 'antd/lib/date-picker';
import {DateFilter} from 'core/filters';
import {Moment} from 'moment';
import React from 'react';
import nameof from 'ts-nameof.macro';
import './DatePickerFilter.scss';

interface DatePickerFilterProps {
  filter: DateFilter;

  defaultType?: string;

  onChange?(filter: DateFilter);
}

function DatePickerFilter(props: DatePickerFilterProps) {
  const {
    filter,
    defaultType,
    onChange,
  } = props;

  const [type] = React.useState<keyof DateFilter>((defaultType || DateFilter.types()[0]) as keyof DateFilter);

  const handleChangeRange = React.useCallback(
    (range) => {
      filter.greaterEqual = range[0];
      filter.lessEqual = range[1];
      if (onChange) {
        onChange(filter);
      }
    },
    [filter, onChange],
  );

  const handleChange = React.useCallback(
    (value: Moment) => {
      filter[type as any] = value;
      if (onChange) {
        onChange(filter);
      }
    },
    [filter, onChange, type],
  );

  return React.useMemo(
    () => {
      if (type === nameof(filter.range)) {
        const dateFilterRange: [Moment | null | undefined, Moment | null | undefined] = [filter.greaterEqual, filter.lessEqual];
        return (
          <DatePicker.RangePicker value={dateFilterRange}
                                  onChange={handleChangeRange}
          />
        );
      }
      return (
        <DatePicker value={filter[type] as Moment}
                    onChange={handleChange}
        />
      );
    },
    [filter, handleChange, handleChangeRange, type],
  );
}

export default DatePickerFilter;
