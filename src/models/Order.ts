import {Model} from 'core';

import {Customer} from 'models/Customer';
import {District} from 'models/District';
import {OrderContent} from 'models/OrderContent';
import {OrderStatus} from 'models/OrderStatus';
import {PaymentMethod} from 'models/PaymentMethod';
import {Province} from 'models/Province';
import {Ward} from 'models/Ward';
import {Moment} from 'moment';

export class Order extends Model {

  public id?: number;

  public customerId?: number;

  public createdDate?: string | Date | Moment;

  public couponCode?: string;

  public totalPrice?: number;

  public discountPrice?: number;

  public statusId?: number;

  public address?: string;

  public provinceId?: number;

  public districtId?: number;

  public wardId?: number;

  public phoneNumber?: string;

  public paymentMethodId?: number;

  public customer?: Customer;

  public district?: District;

  public paymentMethod?: PaymentMethod;

  public province?: Province;

  public status?: OrderStatus;

  public ward?: Ward;

  public orderContents?: OrderContent[];

  public constructor(order?: Order) {
    super(order);
  }
}
