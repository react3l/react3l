import {DISTRICT_ROUTE, PROVINCE_ROUTE, WARD_ROUTE} from 'config/route-consts';
import {translate} from 'core/helpers';
import {RouteConfig} from 'react-router-config';

export const menu: RouteConfig[] = [
  {
    title: translate('menu.province'),
    icon: 'appstore',
    path: PROVINCE_ROUTE,
  },
  {
    title: translate('menu.district'),
    icon: 'appstore',
    path: DISTRICT_ROUTE,
  },
  {
    title: translate('menu.ward'),
    icon: 'appstore',
    path: WARD_ROUTE,
  },
];
