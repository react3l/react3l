import Spin from 'antd/lib/spin';
import {GlobalState} from 'core/config/global';
import {ReactNode} from 'react';
import React, {useGlobal} from 'reactn';

export interface AppLoadingProps {
  children?: ReactNode | ReactNode[];
}

function AppLoading(props: AppLoadingProps) {
  const [loading, setLoading] = useGlobal<GlobalState>('loading');
  const {children} = props;

  React.useEffect(
    () => {
      setLoading(false);
    },
    [setLoading],
  );

  return (
    <Spin spinning={loading as boolean}>
      {children}
    </Spin>
  );
}

export default AppLoading;
