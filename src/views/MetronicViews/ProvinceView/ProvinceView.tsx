import React from 'react';
import {Switch, withRouter} from 'react-router';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import './ProvinceView.scss';

function ProvinceView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route?.routes && renderRoutes(route.routes)}
    </Switch>
  );
}

export default withRouter(ProvinceView);
