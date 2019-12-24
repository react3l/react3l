import React from 'react';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {Switch} from 'react-router-dom';

export interface AppProps {
  routes?: RouteConfig[];
}

function App(props: AppProps) {
  const {routes} = props;

  return (
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  );
}

export default App;
