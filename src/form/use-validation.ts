import React from 'react';
import {Schema} from 'yup';

export function useValidation<T>(initialValue: Schema<T>): Schema<T> {
  return React.useRef<Schema<T>>(initialValue).current;
}
