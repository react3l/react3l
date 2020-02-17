import {ROOT_ROUTE} from 'config/route-consts';
import DefaultLayout from 'layouts/DefaultLayout/DefaultLayout';
import {RouteConfig} from 'react-router-config';

export const routes: RouteConfig[] = [
  {
    path: ROOT_ROUTE,
    component: DefaultLayout,
    routes: [],
  },
];
