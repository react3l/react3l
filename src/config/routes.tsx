import {PROVINCE_ROUTE, ROOT_ROUTE} from 'config/route-consts';
import {defaultActions} from 'core/config';
import {translate} from 'core/helpers';
import CoreUILayout from 'layouts/CoreUILayout/CoreUILayout';
import path from 'path';
import {RouteConfig} from 'react-router-config';
import ProvinceDetail from 'views/DefaultViews/ProvinceView/ProvinceDetail/ProvinceDetail';
import ProvinceMaster from 'views/DefaultViews/ProvinceView/ProvinceMaster/ProvinceMaster';
import ProvinceView from 'views/DefaultViews/ProvinceView/ProvinceView';

export const routes: RouteConfig[] = [
  {
    path: ROOT_ROUTE,
    component: CoreUILayout,
    name: translate('menu.root'),
    routes: [
      {
        path: PROVINCE_ROUTE,
        component: ProvinceView,
        name: translate('menu.provinces.name'),
        routes: [
          {
            path: path.join(PROVINCE_ROUTE, defaultActions.add),
            component: ProvinceDetail,
            name: translate('menu.provinces.add'),
          },
          {
            path: path.join(PROVINCE_ROUTE, ':id'),
            component: ProvinceDetail,
            name: translate('menu.provinces.detail'),
          },
          {
            path: path.join(PROVINCE_ROUTE),
            component: ProvinceMaster,
            name: translate('menu.provinces.master'),
            exact: true,
          },
        ],
      },
    ],
  },
];
