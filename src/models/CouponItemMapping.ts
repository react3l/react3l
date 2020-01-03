import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Coupon} from './Coupon';
import {Item} from './Item';

export class CouponItemMapping extends Model {

  public static clone<T extends Model = CouponItemMapping>(couponItemMapping?: PureModelData<CouponItemMapping>): T | null {
    const instance: T = new Model() as T;
    if (typeof couponItemMapping !== 'undefined' && couponItemMapping !== null) {
      Object.assign(instance, {
        ...couponItemMapping,

        coupon: Coupon.clone<Coupon>(couponItemMapping.coupon),

        item: Item.clone<Item>(couponItemMapping.item),
      });
      return instance;
    }
    return null;
  }

  public couponId?: number;

  public itemId?: number;

  public coupon?: Coupon;

  public item?: Item;

  public errors?: ErrorMap<CouponItemMapping>;
}
