import Switch from 'antd/lib/switch';
import React from 'react';
import { commonService } from '@react3l/react3l/services/common-service';

export default {
  title: 'Common State/Boolean',
};

export const useBoolean = () => {
  const [state, handleToggleState] = commonService.useBooleanState(false);

  return (
    <Switch checked={state} onChange={handleToggleState}/>
  );
};
