import {PROVINCE_ROUTE, ROOT_ROUTE} from 'config/route-consts';
import MetronicLayout from 'layouts/MetronicLayout/MetronicLayout';
import path from 'path';
import {RouteConfig} from 'react-router-config';
import ProvinceDetail from 'views/MetronicViews/ProvinceView/ProvinceDetail/ProvinceDetail';
import ProvinceMaster from 'views/MetronicViews/ProvinceView/ProvinceMaster/ProvinceMaster';
import ProvinceView from 'views/MetronicViews/ProvinceView/ProvinceView';

export const routes: RouteConfig[] = [
  {
    path: ROOT_ROUTE,
    component: MetronicLayout,
    routes: [
      {
        path: PROVINCE_ROUTE,
        component: ProvinceView,
        routes: [
          {
            path: path.join(PROVINCE_ROUTE, ':id'),
            component: ProvinceDetail,
          },
          {
            path: PROVINCE_ROUTE,
            component: ProvinceMaster,
            exact: true,
          },
        ],
      },
    ],
  },
];
