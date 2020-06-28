import React, {Dispatch, SetStateAction} from 'react';

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
  Dispatch<SetStateAction<boolean>>,
] {
  const [state, setState] = React.useState<boolean>(initialState);

  const handleToggleState = React.useCallback(
    () => {
      setState(!state);
      if (typeof callback === 'function') {
        callback();
      }
    },
    [callback, state]
  );

  const handleSetTrue = React.useCallback(
    () => {
      setState(true);
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
      setState(true);
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
    setState,
  ];
}
