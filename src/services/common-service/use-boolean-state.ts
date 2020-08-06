import React, {Reducer} from 'react';

export interface BooleanAction {
  type: 'toggle' | 'turn-on' | 'turn-off';
}

function booleanReducer(state: boolean, action: BooleanAction) {
  switch (action.type) {
    case 'toggle':
      return !state;

    case 'turn-on':
      return true;

    case 'turn-off':
      return false;

    default:
      return state;
  }
}

export function useBooleanState(
  initialState: boolean = false,
  callback?: () => any,
  onTrue?: () => any,
  onFalse?: () => any,
): [
  boolean,
  () => void,
  () => void,
  () => void,
] {
  const [state, dispatch] = React.useReducer<Reducer<boolean, BooleanAction>>(booleanReducer, initialState);

  const handleToggleState = React.useCallback(
    () => {
      dispatch({
        type: 'toggle',
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
    [callback]
  );

  const handleSetTrue = React.useCallback(
    () => {
      dispatch({
        type: 'turn-on',
      });
      if (typeof callback === 'function') {
        callback();
      }
      if (typeof onTrue === 'function') {
        onTrue();
      }
    },
    [callback, onTrue],
  );

  const handleSetFalse = React.useCallback(
    () => {
      dispatch({
        type: 'turn-off',
      });
      if (typeof callback === 'function') {
        callback();
      }
      if (typeof onFalse === 'function') {
        onFalse();
      }
    },
    [callback, onFalse],
  );

  return [
    state,
    handleToggleState,
    handleSetTrue,
    handleSetFalse,
  ];
}
