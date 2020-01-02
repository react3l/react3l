import {Model} from 'core';

import {Order} from 'models/Order';

export class PaymentMethod extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public description?: string;

  public orders?: Order[];

  public constructor(paymentMethod?: PaymentMethod) {
    super(paymentMethod);
  }
}
