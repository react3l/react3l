import {PROVINCE_ROUTE} from 'config/route-consts';
import {translate} from 'core/helpers';
import {RouteConfig} from 'react-router-config';

export const menu: RouteConfig[] = [
  {
    path: PROVINCE_ROUTE,
    title: translate('menu.province'),
    icon: 'fa fa-building',
  },
];
