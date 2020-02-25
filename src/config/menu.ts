import {PROVINCE_ROUTE} from 'config/route-consts';
import {translate} from 'core/helpers';
import {RouteConfig} from 'react-router-config';

export const menu: { items: RouteConfig[] } = {
  items: [{
    name: translate('menu.provinces.name'), url: PROVINCE_ROUTE, icon: 'fa fa-building',
  }],
};
