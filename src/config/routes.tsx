import {menu} from 'config/menu';
import {HOME_ROUTE, PRODUCT_ROUTE, PROVINCE_ROUTE} from 'config/route-consts';
import DefaultLayout, {DefaultLayoutProps} from 'core/layouts/DefaultLayout/DefaultLayout';
import {join} from 'path';
import React from 'react';
import {RouteConfig} from 'react-router-config';
import ProductDetail from 'views/ProductView/ProductDetail/ProductDetail';
import ProductMaster from 'views/ProductView/ProductMaster/ProductMaster';
import ProductView from 'views/ProductView/ProductView';
import ProvinceView, {ProvinceDetail, ProvinceMaster} from 'views/ProvinceView/ProvinceView';

export const routes: RouteConfig[] = [
  {
    path: HOME_ROUTE,
    render: (props: DefaultLayoutProps) => {
      return (
        <DefaultLayout {...props} menu={menu}/>
      );
    },
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
      {
        path: PRODUCT_ROUTE,
        component: ProductView,
        children: [
          {
            path: join(PRODUCT_ROUTE, ':id'),
            component: ProductDetail,
          },
          {
            path: join(PRODUCT_ROUTE),
            component: ProductMaster,
          },
        ],
      },
    ],
  },
];
