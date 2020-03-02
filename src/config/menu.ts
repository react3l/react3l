import {RouteConfig} from 'react-router-config';
import {APPLICATION_USER_ROUTE, PROVINCE_ROUTE} from 'config/route-consts';
import {translate} from 'core/helpers/internationalization';

export const menu: RouteConfig[] = [
  {
    name: translate('menu.provinces'),
    url: PROVINCE_ROUTE,
    icon: 'fa fa-building',
  },
  {
    name: translate('menu.applicationUsers'),
    url: APPLICATION_USER_ROUTE,
    icon: 'fa fa-users',
  },
];
