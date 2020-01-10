import InputNumber from 'components/InputNumber/InputNumber';
import React from 'react';
import './NumberRange.scss';

interface NumberRangeProps {
  value?: [number | undefined, number | undefined];

  onChange?(value: [number | undefined, number | undefined]);
}

function NumberRange(props: NumberRangeProps) {
  const {
    value: [
      minValue,
      maxValue,
    ] = [],
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
      <InputNumber defaultValue={minValue} onChange={handleChangeMinValue}/>
      <span className="separator"/>
      <InputNumber defaultValue={maxValue} onChange={handleChangeMaxValue}/>
    </div>
  );
}

export default NumberRange;
