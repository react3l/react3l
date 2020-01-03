import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Coupon} from './Coupon';
import {Customer} from './Customer';

export class CouponCustomerMapping extends Model {

  public static clone<T extends Model = CouponCustomerMapping>(couponCustomerMapping?: PureModelData<CouponCustomerMapping>): T | null {
    const instance: T = new Model() as T;
    if (typeof couponCustomerMapping !== 'undefined' && couponCustomerMapping !== null) {
      Object.assign(instance, {
        ...couponCustomerMapping,

        coupon: Coupon.clone<Coupon>(couponCustomerMapping.coupon),

        customer: Customer.clone<Customer>(couponCustomerMapping.customer),
      });
      return instance;
    }
    return null;
  }

  public couponId?: number;

  public customerId?: number;

  public coupon?: Coupon;

  public customer?: Customer;

  public errors?: ErrorMap<CouponCustomerMapping>;
}
