import {PROVINCE_ROUTE, ROOT_ROUTE} from 'config/route-consts';
import {defaultActions} from 'core/config';
import DefaultLayout from 'layouts/DefaultLayout/DefaultLayout';
import path from 'path';
import {RouteConfig} from 'react-router-config';
import ProvinceDetail from 'views/DefaultViews/ProvinceView/ProvinceDetail/ProvinceDetail';
import ProvinceMaster from 'views/DefaultViews/ProvinceView/ProvinceMaster/ProvinceMaster';
import ProvinceView from 'views/DefaultViews/ProvinceView/ProvinceView';

export const routes: RouteConfig[] = [
  {
    path: ROOT_ROUTE,
    component: DefaultLayout,
    routes: [
      {
        path: PROVINCE_ROUTE,
        component: ProvinceView,
        routes: [
          {
            path: path.join(PROVINCE_ROUTE, defaultActions.add),
            component: ProvinceDetail,
          },
          {
            path: path.join(PROVINCE_ROUTE, ':id'),
            component: ProvinceDetail,
          },
          {
            path: PROVINCE_ROUTE,
            component: ProvinceMaster,
          },
        ],
      },
    ],
  },
];
