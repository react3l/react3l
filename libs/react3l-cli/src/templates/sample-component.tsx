import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';

export function SampleComponent(props: PropsWithChildren<SampleComponentProps>): ReactElement {
  const {children} = props;

  return (
    <>
      {children}
    </>
  );
}

export interface SampleComponentProps {
  //
}

export default SampleComponent;
