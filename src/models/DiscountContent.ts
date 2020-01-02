import {Model} from 'core';

import {Discount} from 'models/Discount';
import {Item} from 'models/Item';

export class DiscountContent extends Model {

  public itemId?: number;

  public discountId?: number;

  public discount?: Discount;

  public item?: Item;

  public constructor(discountContent?: DiscountContent) {
    super(discountContent);
  }
}
