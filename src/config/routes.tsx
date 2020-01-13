import {COLLECTION_ROUTE, HOME_ROUTE, PRODUCT_ROUTE} from 'config/route-consts';
import DefaultLayout from 'layouts/DefaultLayout/DefaultLayout';
import {join} from 'path';
import {RouteConfig} from 'react-router-config';
import CollectionView, {CollectionDetail, CollectionMaster} from 'views/CollectionView/CollectionView';
import ProductDetail from 'views/ProductView/ProductDetail/ProductDetail';
import ProductMaster from 'views/ProductView/ProductMaster/ProductMaster';
import ProductView from 'views/ProductView/ProductView';

export const routes: RouteConfig[] = [
  {
    path: HOME_ROUTE,
    component: DefaultLayout,
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
      {
        path: COLLECTION_ROUTE,
        component: CollectionView,
        children: [
          {
            path: join(COLLECTION_ROUTE, ':id'),
            component: CollectionDetail,
          },
          {
            path: join(COLLECTION_ROUTE),
            component: CollectionMaster,
          },
        ],
      },
    ],
  },
];
