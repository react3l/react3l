import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Coupon} from './Coupon';
import {CustomerGrouping} from './CustomerGrouping';

export class Customer extends Model {

  public static clone<T extends Model = Customer>(customer?: PureModelData<Customer>): T | null {
    const instance: T = new Model() as T;
    if (typeof customer !== 'undefined' && customer !== null) {
      Object.assign(instance, {
        ...customer,

        customerGrouping: CustomerGrouping.clone<CustomerGrouping>(customer.customerGrouping),

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public username?: string;

  public displayName?: string;

  public phoneNumber?: string;

  public email?: string;

  public customerGroupingId?: number;

  public disabled?: boolean;

  public customerGrouping?: CustomerGrouping;

  public coupons?: Coupon[];

  public errors?: ErrorMap<Customer>;
}
