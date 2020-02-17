import React from 'react';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {Switch} from 'react-router-dom';
import {APP_TITLE} from '../../config/consts';

export interface AppProps {
  routes?: RouteConfig[];
}

function App(props: AppProps) {
  const {routes} = props;

  React.useEffect(
    () => {
      document.title = APP_TITLE;
    },
    [],
  );

  return (
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  );
}

export default App;
