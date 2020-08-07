import React, {Dispatch, Reducer} from 'react';

export interface ListStateAction<T> {
  type: 'reset' | 'add-item' | 'remove-item' | 'concat' | 'set-value';

  item?: T;

  index?: number;

  data?: T[];
}

export function listStateReducer<T>(state: T[], action: ListStateAction<T>): T[] {
  switch (action.type) {
    case 'add-item':
      return [
        ...state,
        action.item,
      ];

    case 'remove-item':
      state.splice(action.index, 1);
      return [
        ...state,
      ];

    case 'set-value':
      return action.data;

    case 'concat':
      return [
        ...state,
        ...action.data,
      ];

    case 'reset':
      return [];

    default:
      return state;
  }
}

export function useListState<T>(): [
  T[],
  Dispatch<ListStateAction<T>>,
] {
  return  React.useReducer<Reducer<T[], ListStateAction<T>>>(listStateReducer, []);
}
