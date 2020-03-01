import InputNumber from 'components/InputNumber/InputNumber';
import 'components/NumberRange/NumberRange.scss';
import React from 'react';
import {useTranslation} from 'react-i18next';

export interface NumberRangeProps {
  value?: [number | undefined, number | undefined];

  onChange?(value: [number | undefined, number | undefined]);
}

function NumberRange(props: NumberRangeProps) {
  const [translate] = useTranslation();

  const {
    value: [minValue, maxValue] = [],
    onChange,
  } = props ?? {};

  const handleChangeMinValue = React.useCallback(
    (value: number) => {
      if (typeof onChange === 'function') {
        onChange([value, maxValue]);
      }
    },
    [maxValue, onChange],
  );

  const handleChangeMaxValue = React.useCallback(
    (value: number) => {
      if (typeof onChange === 'function') {
        onChange([minValue, value]);
      }
    },
    [minValue, onChange],
  );

  return (
    <div className="number-range">
      <InputNumber defaultValue={minValue}
                   onChange={handleChangeMinValue}
                   placeholder={translate('general.numberRange.from')}/>
      <span className="separator"/>
      <InputNumber defaultValue={maxValue}
                   onChange={handleChangeMaxValue}
                   placeholder={translate('general.numberRange.to')}/>
    </div>
  );
}

export default NumberRange;
