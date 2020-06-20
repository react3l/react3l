import {Service} from 'core/service';
import React, {Dispatch, SetStateAction} from 'react';

export class CommonState extends Service {
  useBoolean(
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

  useHOFChangeHandlers<T extends Record<string, any>>(
    state: T,
    setState: Dispatch<SetStateAction<T>>
  ): [
    <P extends keyof T>(field: P) => (value: T[P]) => void,
    <P extends keyof T>(field: P) => (value: T[P]) => void,
  ] {
    const handleChangeSimpleField = React.useCallback(
      <P extends keyof T>(field: P) => async (value: T[P]) => {
        await setState({
          ...state,
          [field]: value,
        });
      },
      [setState, state]
    );

    const handleChangeRelationField = React.useCallback(
      <P extends keyof T>(field: P) => async (value: T[P]) => {
        await setState({
          ...state,
          [field]: value,
          [`${field}Id`]: value?.id,
        });
      },
      [setState, state],
    )

    return [
      handleChangeSimpleField,
      handleChangeRelationField,
    ];
  }
}

export const commonState: CommonState = new CommonState();
