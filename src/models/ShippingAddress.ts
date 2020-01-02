import {Model} from 'core';

import {Customer} from 'models/Customer';
import {District} from 'models/District';
import {Province} from 'models/Province';
import {Ward} from 'models/Ward';

export class ShippingAddress extends Model {

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

  public constructor(shippingAddress?: ShippingAddress) {
    super(shippingAddress);
  }
}
