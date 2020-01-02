import {Model} from 'core';

import {Collection} from 'models/Collection';
import {Item} from 'models/Item';

export class CollectionContent extends Model {

  public id?: number;

  public collectionId?: number;

  public orderNumber?: number;

  public itemId?: number;

  public collection?: Collection;

  public item?: Item;

  public constructor(collectionContent?: CollectionContent) {
    super(collectionContent);
  }
}
