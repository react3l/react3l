import {RouteConfig} from 'react-router-config';
import {APPLICATION_USER_ROUTE, PROVINCE_ROUTE, ROOT_ROUTE} from 'config/route-consts';
import DefaultLayout from 'layouts/DefaultLayout/DefaultLayout';
import ProvinceView from 'views/ProvinceView/ProvinceView';
import path from 'path';
import {generalLanguageKeys} from 'config/consts';
import ProvinceDetail from 'views/ProvinceView/ProvinceDetail/ProvinceDetail';
import nameof from 'ts-nameof.macro';
import ProvinceMaster from 'views/ProvinceView/ProvinceMaster/ProvinceMaster';
import ApplicationUserView from 'views/ApplicationUserView/ApplicationUserView';
import ApplicationUserDetail from 'views/ApplicationUserView/ApplicationUserDetail/ApplicationUserDetail';
import ApplicationUserMaster from 'views/ApplicationUserView/ApplicationUserMaster/ApplicationUserMaster';

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
            path: path.join(PROVINCE_ROUTE, nameof(generalLanguageKeys.actions.create)),
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
      {
        path: APPLICATION_USER_ROUTE,
        component: ApplicationUserView,
        routes: [
          {
            path: path.join(APPLICATION_USER_ROUTE, nameof(generalLanguageKeys.actions.create)),
            component: ApplicationUserDetail,
          },
          {
            path: path.join(APPLICATION_USER_ROUTE, ':id'),
            component: ApplicationUserDetail,
          },
          {
            path: APPLICATION_USER_ROUTE,
            component: ApplicationUserMaster,
          },
        ],
      },
    ],
  },
];
