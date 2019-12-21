import {DISTRICT_ROUTE, PROVINCE_ROUTE, WARD_ROUTE} from 'config/route-consts';
import {translate} from 'core/helpers';
import {RouteConfig} from 'react-router-config';

export const menu: RouteConfig[] = [
  {
    title: translate('menu.province'),
    matIcon: 'location_city',
    path: PROVINCE_ROUTE,
  },
  {
    title: translate('menu.district'),
    matIcon: 'location_city',
    path: DISTRICT_ROUTE,
  },
  {
    title: translate('menu.ward'),
    matIcon: 'location_city',
    path: WARD_ROUTE,
  },
];
