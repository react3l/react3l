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
  } = props;

  const [type] = React.useState<keyof DateFilter>((defaultType || DateFilter.types()[0]) as keyof DateFilter);

  return React.useMemo(
    () => {
      if (type === nameof(filter.range)) {
        return (
          <DatePicker.RangePicker value={filter[type] as DateFilter['range']}/>
        );
      }
      return (
        <DatePicker value={filter[type] as Moment}/>
      );
    },
    [filter, type],
  );
}

export default DatePickerFilter;
