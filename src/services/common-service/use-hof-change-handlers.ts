import React, {Dispatch, SetStateAction} from 'react';

export function useHOFChangeHandlers<T extends Record<string, any>>(
  state: T,
  setState: Dispatch<SetStateAction<T>>,
): [
  <P extends keyof T>(field: P) => (value: T[P]) => Promise<void> | void,
  <P extends keyof T>(field: P) => (value: T[P]) => Promise<void> | void,
] {
  const handleChangeSimpleField = React.useCallback(
    <P extends keyof T>(field: P) => (value: T[P]) => {
      return setState({
        ...state,
        [field]: value,
      });
    },
    [setState, state],
  );

  const handleChangeRelationField = React.useCallback(
    <P extends keyof T>(field: P) => (value: T[P]) => {
      return setState({
        ...state,
        [field]: value,
        [`${field}Id`]: value?.id,
      });
    },
    [setState, state],
  );

  return [
    handleChangeSimpleField,
    handleChangeRelationField,
  ];
}
