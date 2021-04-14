import type { Reducer } from 'react';

export type ListReducer<T> = Reducer<T[], ListReducerAction<T>>;

export enum ListReducerActionType {
  ADD,
  UPDATE,
  DELETE,
  RESET,
  REVERSE,
}

export interface ListReducerAction<T> {
  type: ListReducerActionType;

  index?: number;

  element?: T;

  list?: T[];
}

export function listReducer<T>(state: T[], action: ListReducerAction<T>): T[] {
  switch (action.type) {
    case ListReducerActionType.ADD:
      return [...state, action.element];

    case ListReducerActionType.DELETE:
      state.splice(action.index, 1);
      return [...state];

    case ListReducerActionType.RESET:
      return [];

    case ListReducerActionType.REVERSE:
      return state.reverse();

    case ListReducerActionType.UPDATE:
      return action.list;

    default:
      return state;
  }
}
