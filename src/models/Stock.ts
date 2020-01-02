import {Model} from 'core';

import {Item} from 'models/Item';
import {Warehouse} from 'models/Warehouse';

export class Stock extends Model {

  public id?: number;

  public itemId?: number;

  public warehouseId?: number;

  public quantity?: number;

  public item?: Item;

  public warehouse?: Warehouse;

  public constructor(stock?: Stock) {
    super(stock);
  }
}
