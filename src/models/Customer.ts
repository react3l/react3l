import {Model} from 'core';
import {Cart} from 'models/Cart';

import {CustomerGrouping} from 'models/CustomerGrouping';
import {EVoucher} from 'models/EVoucher';
import {Order} from 'models/Order';
import {ShippingAddress} from 'models/ShippingAddress';

export class Customer extends Model {

  public id?: number;

  public username?: string;

  public displayName?: string;

  public phoneNumber?: string;

  public email?: string;

  public customerGroupingId?: number;

  public disabled?: boolean;

  public customerGrouping?: CustomerGrouping;

  public carts?: Cart[];

  public eVouchers?: EVoucher[];

  public orders?: Order[];

  public shippingAddresses?: ShippingAddress[];

  public constructor(customer?: Customer) {
    super(customer);
  }
}
