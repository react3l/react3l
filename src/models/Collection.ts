import {Model} from 'core';
import {CollectionContent} from 'models/CollectionContent';

import {CollectionStatus} from 'models/CollectionStatus';
import {Moment} from 'moment';

export class Collection extends Model {

  public id?: number;

  public name?: string;

  public start?: string | Date | Moment;

  public end?: string | Date | Moment;

  public statusId?: number;

  public status?: CollectionStatus;

  public collectionContents?: CollectionContent[];

  public constructor(collection?: Collection) {
    super(collection);
  }
}
