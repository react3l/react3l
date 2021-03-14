import type { Reducer } from 'react';

export function booleanReducer(state: boolean, action: BooleanAction): boolean {
  switch (action) {
    case 'false':
      return false;

    case 'true':
      return true;

    case 'toggle':
      return !state;

    default:
      return state;
  }
}

export type BooleanAction = 'toggle' | 'true' | 'false';

export type BooleanReducer = Reducer<boolean, BooleanAction>;
