import {Model} from 'core';

import {Item} from 'models/Item';
import {Order} from 'models/Order';

export class OrderContent extends Model {

  public id?: number;

  public orderId?: number;

  public itemId?: number;

  public price?: number;

  public discountPrice?: number;

  public quantity?: number;

  public disabled?: boolean;

  public item?: Item;

  public order?: Order;

  public constructor(orderContent?: OrderContent) {
    super(orderContent);
  }
}
