import React from 'react';
import {Switch, withRouter} from 'react-router';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import 'views/DefaultViews/ProvinceView/ProvinceView.scss';

function ProvinceView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route?.routes instanceof Array && renderRoutes(route.routes)}
    </Switch>
  );
}

export default withRouter(ProvinceView);
