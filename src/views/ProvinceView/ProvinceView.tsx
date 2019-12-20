import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import ProvinceDetail from './ProvinceDetail/ProvinceDetail';
import ProvinceMaster from './ProvinceMaster/ProvinceMaster';
import './ProvinceView.scss';

function ProvinceView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export {ProvinceMaster, ProvinceDetail};

export default withRouter(ProvinceView);
