import {commonState} from 'services/common-service';
import React from 'react';
import Switch from 'antd/lib/switch';

export default {
  title: 'CommonState',
};

export const useBoolean = () => {
  const [state, handleToggleState] = commonState.useBooleanState(false);

  return (
    <Switch checked={state} onChange={handleToggleState}/>
  );
};
