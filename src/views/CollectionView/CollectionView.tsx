import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import CollectionDetail from './CollectionDetail/CollectionDetail';
import CollectionMaster from './CollectionMaster/CollectionMaster';
import './CollectionView.scss';

function CollectionView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export {CollectionMaster, CollectionDetail};

export default withRouter(CollectionView);
