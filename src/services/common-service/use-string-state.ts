import React, {Dispatch, Reducer} from 'react';

export interface StringStateAction {
  type: 'clear' | 'input';

  value?: string;
}

export function stringStateReducer(state: string, action: StringStateAction): string {
  switch (action.type) {
    case 'input':
      return action.value as string;

    case 'clear':
      return '';

    default:
      return state;
  }
}

export function useStringState(initialState: string): [
  string,
  Dispatch<StringStateAction>,
] {
  return React.useReducer<Reducer<string, StringStateAction>>(stringStateReducer, initialState);
}
