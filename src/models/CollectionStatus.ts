import {Model} from 'core';

import {Collection} from 'models/Collection';

export class CollectionStatus extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public collections?: Collection[];

  public constructor(collectionStatus?: CollectionStatus) {
    super(collectionStatus);
  }
}
