import {menu} from 'config/menu';
import {HOME_ROUTE, PRODUCT_ROUTE} from 'config/route-consts';
import DefaultLayout, {DefaultLayoutProps} from 'layouts/DefaultLayout/DefaultLayout';
import {join} from 'path';
import React from 'react';
import {RouteConfig} from 'react-router-config';
import ProductDetail from 'views/ProductView/ProductDetail/ProductDetail';
import ProductMaster from 'views/ProductView/ProductMaster/ProductMaster';
import ProductView from 'views/ProductView/ProductView';

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
