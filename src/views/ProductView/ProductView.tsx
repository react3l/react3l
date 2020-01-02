import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductMaster from './ProductMaster/ProductMaster';
import './ProductView.scss';

function ProductView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export {ProductMaster, ProductDetail};

export default withRouter(ProductView);
