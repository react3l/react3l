import React from 'react';
import type { BooleanReducer } from '../reducers';
import { booleanReducer } from '../reducers';

export function useBoolean(
  initialState: boolean
): [
  boolean,
  // Toggle state to opposite value
  () => void,
  // Set state to true
  () => void,
  // Set state to false
  () => void,
] {
  const [state, dispatch] = React.useReducer<BooleanReducer>(
    booleanReducer,
    initialState
  );

  const handleToggle = React.useCallback(() => {
    dispatch('toggle');
  }, []);

  const handleTrue = React.useCallback(() => {
    dispatch('true');
  }, []);

  const handleFalse = React.useCallback(() => {
    dispatch('false');
  }, []);

  return [state, handleToggle, handleTrue, handleFalse];
}
