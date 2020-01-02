import {Model} from 'core';

import {Discount} from 'models/Discount';
import {Unit} from 'models/Unit';

export class DiscountItem extends Model {

  public id?: number;

  public unitId?: number;

  public discountValue?: number;

  public discountId?: number;

  public discount?: Discount;

  public unit?: Unit;

  public constructor(discountItem?: DiscountItem) {
    super(discountItem);
  }
}
