import React from 'react';
import type { BooleanReducer } from '../reducers';
import { booleanReducer } from '../reducers';

/**
 * Boolean state
 */
export type BooleanState = [
  boolean,
  // Toggle state to opposite value
  () => void,
  // Set state to true
  () => void,
  // Set state to false
  () => void,
]

/**
 * Boolean state hook
 *
 * @param initialState {boolean} - initial state
 *
 * @return {BooleanState}
 */
export function useBoolean(
  initialState: boolean
): BooleanState {
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
