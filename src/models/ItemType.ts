import {Model} from 'core';

import {Item} from 'models/Item';

export class ItemType extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public items?: Item[];

  public constructor(itemType?: ItemType) {
    super(itemType);
  }
}
