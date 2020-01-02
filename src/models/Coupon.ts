import {Model} from 'core';
import {CouponType} from 'models/CouponType';

import {ImageFile} from 'models/ImageFile';
import {Moment} from 'moment';

export class Coupon extends Model {

  public id?: number;

  public code?: string;

  public start?: string | Date | Moment;

  public end?: string | Date | Moment;

  public typeId?: number;

  public value?: number;

  public maxAmount?: number;

  public quantity?: number;

  public usageLimitPerCustomer?: number;

  public description?: string;

  public appliedAllCustomers?: boolean;

  public appliedAllItems?: boolean;

  public imageId?: number;

  public image?: ImageFile;

  public type?: CouponType;

  public constructor(coupon?: Coupon) {
    super(coupon);
  }
}
