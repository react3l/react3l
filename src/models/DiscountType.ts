import {Model} from 'core';

import {Discount} from 'models/Discount';

export class DiscountType extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public discounts?: Discount[];

  public constructor(discountType?: DiscountType) {
    super(discountType);
  }
}
