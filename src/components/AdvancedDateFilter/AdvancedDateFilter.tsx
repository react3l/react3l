import DatePicker from 'antd/lib/date-picker';
import 'components/AdvancedDateFilter/AdvancedDateFilter.scss';
import {DateFilter} from 'core/filters';
import {FilterType} from 'core/types';
import {Moment} from 'moment';
import React, {ComponentProps} from 'react';
import nameof from 'ts-nameof.macro';

export interface AdvancedDateFilterProps extends ComponentProps<any> {
  filter: DateFilter;

  filterType?: keyof DateFilter | string;

  onChange?(filter: DateFilter);
}

const dateFilterTypes: Array<FilterType<DateFilter>> = DateFilter.types();

function AdvancedDateFilter(props: AdvancedDateFilterProps) {
  const {
    filter, filterType, onChange, className,
  } = props;

  const [type] = React.useState<keyof DateFilter>((filterType ?? dateFilterTypes[0].key as any));

  const handleChangeRange = React.useCallback((range) => {
    filter.greaterEqual = range[0];
    filter.lessEqual = range[1];
    if (onChange) {
      onChange(filter);
    }
  }, [filter, onChange]);

  const handleChange = React.useCallback((value: Moment) => {
    filter[type as any] = value;
    if (onChange) {
      onChange(filter);
    }
  }, [filter, onChange, type]);

  return React.useMemo(() => {
    if (type === nameof(filter.range)) {
      const dateFilterRange: [Moment | null | undefined, Moment | null | undefined] = [filter.greaterEqual, filter.lessEqual];
      return (<DatePicker.RangePicker value={dateFilterRange}
                                      onChange={handleChangeRange}
                                      className={className}
        />);
    }
    return (<DatePicker value={filter[type] as Moment}
                        onChange={handleChange}
                        className={className}
      />);
  }, [className, filter, handleChange, handleChangeRange, type]);
}

export default AdvancedDateFilter;
