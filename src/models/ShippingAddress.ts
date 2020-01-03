import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Customer} from './Customer';
import {District} from './District';
import {Province} from './Province';
import {Ward} from './Ward';

export class ShippingAddress extends Model {

  public static clone<T extends Model = ShippingAddress>(shippingAddress?: PureModelData<ShippingAddress>): T | null {
    const instance: T = new Model() as T;
    if (typeof shippingAddress !== 'undefined' && shippingAddress !== null) {
      Object.assign(instance, {
        ...shippingAddress,

        customer: Customer.clone<Customer>(shippingAddress.customer),

        district: District.clone<District>(shippingAddress.district),

        province: Province.clone<Province>(shippingAddress.province),

        ward: Ward.clone<Ward>(shippingAddress.ward),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public customerId?: number;

  public fullName?: string;

  public companyName?: string;

  public phoneNumber?: string;

  public provinceId?: number;

  public districtId?: number;

  public wardId?: number;

  public address?: string;

  public isDefault?: boolean;

  public customer?: Customer;

  public district?: District;

  public province?: Province;

  public ward?: Ward;

  public errors?: ErrorMap<ShippingAddress>;
}
