import {COLLECTION_ROUTE, PRODUCT_ROUTE} from 'config/route-consts';
import {translate} from 'core/helpers';
import {RouteConfig} from 'react-router-config';

export const menu: RouteConfig[] = [
  {
    title: translate('menu.collection'),
    matIcon: 'location_city',
    path: COLLECTION_ROUTE,
  },
  {
    title: translate('menu.product'),
    matIcon: 'location_city',
    path: PRODUCT_ROUTE,
  },
];
