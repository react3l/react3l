import React from 'react';
import {Switch, withRouter} from 'react-router';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import './ApplicationUserView.scss';

function ApplicationUserView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route?.routes instanceof Array && renderRoutes(route.routes)}
    </Switch>
  );
}

export default withRouter(ApplicationUserView);
