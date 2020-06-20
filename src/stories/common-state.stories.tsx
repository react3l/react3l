import {commonState} from 'services/common-state';
import React from 'react';
import Switch from 'antd/lib/switch';

export default {
  title: 'CommonState',
};

export const useBoolean = () => {
  const [state, handleToggleState] = commonState.useBoolean(false);

  return (
    <Switch checked={state} onChange={handleToggleState}/>
  );
};
