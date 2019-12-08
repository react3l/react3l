import {HOME_ROUTE, PROVINCE_ROUTE} from 'config/route-consts';
import DefaultLayout from 'layouts/DefaultLayout/DefaultLayout';
import {join} from 'path';
import {RouteConfig} from 'react-router-config';
import ProvinceView, {ProvinceDetail, ProvinceMaster} from 'views/ProvinceView/ProvinceView';

export const routes: RouteConfig[] = [
  {
    path: HOME_ROUTE,
    component: DefaultLayout,
    children: [
      {
        path: PROVINCE_ROUTE,
        component: ProvinceView,
        children: [
          {
            path: join(PROVINCE_ROUTE, ':id'),
            component: ProvinceDetail,
          },
          {
            path: join(PROVINCE_ROUTE),
            component: ProvinceMaster,
          },
        ],
      },
    ],
  },
];
