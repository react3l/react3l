import {Model} from 'core';

import {Customer} from 'models/Customer';
import {Item} from 'models/Item';

export class Cart extends Model {

  public id?: number;

  public customerId?: number;

  public itemId?: number;

  public quantity?: number;

  public customer?: Customer;

  public item?: Item;

  public constructor(cart?: Cart) {
    super(cart);
  }
}
