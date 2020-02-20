import {GlobalState} from 'core/config';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {Switch} from 'react-router-dom';
import React from 'reactn';

export interface AppProps {
  routes?: RouteConfig[];
}

function App(props: AppProps) {
  const {routes} = props;

  const [title] = React.useGlobal<GlobalState, 'title'>('title');

  React.useEffect(
    () => {
      document.title = title;
    },
    [title],
  );

  return (
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  );
}

export default App;
