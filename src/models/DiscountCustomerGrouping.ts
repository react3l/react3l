import {Model} from 'core';

import {Discount} from 'models/Discount';

export class DiscountCustomerGrouping extends Model {

  public id?: number;

  public discountId?: number;

  public customerGroupingCode?: string;

  public discount?: Discount;

  public constructor(discountCustomerGrouping?: DiscountCustomerGrouping) {
    super(discountCustomerGrouping);
  }
}
