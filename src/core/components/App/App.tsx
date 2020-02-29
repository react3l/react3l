import React from 'react';
import {renderRoutes, RouteConfig, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import {languageService} from 'core/services/LanguageService';

export interface AppProps extends RouteConfigComponentProps {
  routes: RouteConfig[];
}

function App(props: AppProps) {
  const {routes} = props;

  languageService.useLanguage();

  return (
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  );
}

export default withRouter(App);
