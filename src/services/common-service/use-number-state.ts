import React, {Dispatch, Reducer} from 'react';

export interface NumberAction {
  type: 'increase' | 'decrease' | 'clear' | 'reset' | 'set-value';

  newValue?: number;
}

function numberReducer(state: number, action: NumberAction) {
  switch (action.type) {
    case 'increase':
      return state + 1;

    case 'decrease':
      return state - 1;

    case 'clear':
      return null;

    case 'set-value':
      return action.newValue;

    case 'reset':
      return 0;

    default:
      return state;
  }
}

export function useNumberState(initialState: number = 0): [
  number,
  Dispatch<NumberAction>,
] {
  return React.useReducer<Reducer<number, NumberAction>>(numberReducer, initialState);
}
