import {Model} from 'core';

import {Coupon} from 'models/Coupon';

export class CouponType extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public coupons?: Coupon[];

  public constructor(couponType?: CouponType) {
    super(couponType);
  }
}
