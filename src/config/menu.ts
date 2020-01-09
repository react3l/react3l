import {
  ADMINISTRATOR_ROUTE,
  BANNER_ROUTE,
  BRAND_ROUTE,
  CATEGORY_ROUTE,
  COLLECTION_ROUTE,
  COLLECTIONCONTENT_ROUTE,
  COUPON_ROUTE,
  CUSTOMER_ROUTE,
  DISCOUNT_ROUTE,
  DISTRICT_ROUTE,
  EVOUCHER_ROUTE,
  EVOUCHERCONTENT_ROUTE,
  IMAGEFILE_ROUTE,
  ITEM_ROUTE,
  ITEMHISTORY_ROUTE,
  ITEMVOUCHER_ROUTE,
  ITEMVOUCHERSTATUS_ROUTE,
  MAIL_ROUTE,
  MERCHANT_ROUTE,
  MERCHANTADDRESS_ROUTE,
  MERCHANTCONTACT_ROUTE,
  NOTIFICATION_ROUTE,
  ORDER_ROUTE,
  ORDERCONTENT_ROUTE,
  PRODUCT_ROUTE,
  PROVINCE_ROUTE,
  SHIPPINGADDRESS_ROUTE,
  WARD_ROUTE,
} from 'config/route-consts';
import {translate} from 'core/helpers';
import {RouteConfig} from 'react-router-config';

export const menu: RouteConfig[] = [
  {
    title: translate('menu.administrator'),
    matIcon: 'location_city',
    path: ADMINISTRATOR_ROUTE,
  },
  {
    title: translate('menu.banner'),
    matIcon: 'location_city',
    path: BANNER_ROUTE,
  },
  {
    title: translate('menu.brand'),
    matIcon: 'location_city',
    path: BRAND_ROUTE,
  },
  {
    title: translate('menu.category'),
    matIcon: 'location_city',
    path: CATEGORY_ROUTE,
  },
  {
    title: translate('menu.collectionContent'),
    matIcon: 'location_city',
    path: COLLECTIONCONTENT_ROUTE,
  },
  {
    title: translate('menu.collection'),
    matIcon: 'location_city',
    path: COLLECTION_ROUTE,
  },
  {
    title: translate('menu.coupon'),
    matIcon: 'location_city',
    path: COUPON_ROUTE,
  },
  {
    title: translate('menu.customer'),
    matIcon: 'location_city',
    path: CUSTOMER_ROUTE,
  },
  {
    title: translate('menu.discount'),
    matIcon: 'location_city',
    path: DISCOUNT_ROUTE,
  },
  {
    title: translate('menu.district'),
    matIcon: 'location_city',
    path: DISTRICT_ROUTE,
  },
  {
    title: translate('menu.eVoucherContent'),
    matIcon: 'location_city',
    path: EVOUCHERCONTENT_ROUTE,
  },
  {
    title: translate('menu.eVoucher'),
    matIcon: 'location_city',
    path: EVOUCHER_ROUTE,
  },
  {
    title: translate('menu.imageFile'),
    matIcon: 'location_city',
    path: IMAGEFILE_ROUTE,
  },
  {
    title: translate('menu.item'),
    matIcon: 'location_city',
    path: ITEM_ROUTE,
  },
  {
    title: translate('menu.itemHistory'),
    matIcon: 'location_city',
    path: ITEMHISTORY_ROUTE,
  },
  {
    title: translate('menu.itemVoucher'),
    matIcon: 'location_city',
    path: ITEMVOUCHER_ROUTE,
  },
  {
    title: translate('menu.itemVoucherStatus'),
    matIcon: 'location_city',
    path: ITEMVOUCHERSTATUS_ROUTE,
  },
  {
    title: translate('menu.mail'),
    matIcon: 'location_city',
    path: MAIL_ROUTE,
  },
  {
    title: translate('menu.merchantAddress'),
    matIcon: 'location_city',
    path: MERCHANTADDRESS_ROUTE,
  },
  {
    title: translate('menu.merchantContact'),
    matIcon: 'location_city',
    path: MERCHANTCONTACT_ROUTE,
  },
  {
    title: translate('menu.merchant'),
    matIcon: 'location_city',
    path: MERCHANT_ROUTE,
  },
  {
    title: translate('menu.notification'),
    matIcon: 'location_city',
    path: NOTIFICATION_ROUTE,
  },
  {
    title: translate('menu.orderContent'),
    matIcon: 'location_city',
    path: ORDERCONTENT_ROUTE,
  },
  {
    title: translate('menu.order'),
    matIcon: 'location_city',
    path: ORDER_ROUTE,
  },
  {
    title: translate('menu.product'),
    matIcon: 'location_city',
    path: PRODUCT_ROUTE,
  },
  {
    title: translate('menu.province'),
    matIcon: 'location_city',
    path: PROVINCE_ROUTE,
  },
  {
    title: translate('menu.shippingAddress'),
    matIcon: 'location_city',
    path: SHIPPINGADDRESS_ROUTE,
  },
  {
    title: translate('menu.ward'),
    matIcon: 'location_city',
    path: WARD_ROUTE,
  },
];
