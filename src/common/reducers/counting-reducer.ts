import type { Reducer } from 'react';

export enum CountingReducerActionType {
  INCREASE,
  DECREASE,
  SET,
  RESET,
}

export interface CountingReducerAction {
  type: CountingReducerActionType;

  value?: number;
}

export type CountingReducer = Reducer<number, CountingReducerAction>;

export function countingReducer(
  state: number,
  action: CountingReducerAction,
): number {
  switch (action.type) {
    case CountingReducerActionType.DECREASE:
      return state - 1;

    case CountingReducerActionType.INCREASE:
      return state + 1;

    case CountingReducerActionType.RESET:
      return 0;

    case CountingReducerActionType.SET:
      return action.value;

    default:
      return state;
  }
}
