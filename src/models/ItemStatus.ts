import {Model} from 'core';

import {Item} from 'models/Item';

export class ItemStatus extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public items?: Item[];

  public constructor(itemStatus?: ItemStatus) {
    super(itemStatus);
  }
}
