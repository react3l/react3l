import {Model} from 'core/models';
import React from 'react';

export function useDefaultList<T1 extends Model, T2 extends Model>(model: T1, field: string): T2[] {
  return React.useMemo(
    () => {
      const reference: T2 = model[field];
      if (reference) {
        return [reference];
      }
      return [];
    },
    [field, model],
  );
}
