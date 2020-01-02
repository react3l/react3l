import {Model} from 'core';

import {Customer} from 'models/Customer';
import {Discount} from 'models/Discount';

export class CustomerGrouping extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public customers?: Customer[];

  public discounts?: Discount[];

  public constructor(customerGrouping?: CustomerGrouping) {
    super(customerGrouping);
  }
}
