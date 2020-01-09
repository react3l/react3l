import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {CollectionContent} from './CollectionContent';
import {CollectionStatus} from './CollectionStatus';

export class Collection extends Model {

  public static clone<T extends Model = Collection>(collection?: PureModelData<Collection>): T | null {
    const instance: T = new Model() as T;
    if (typeof collection !== 'undefined' && collection !== null) {
      Object.assign(instance, {
        ...collection,

        start: moment(collection.start),

        end: moment(collection.end),

        status: CollectionStatus.clone<CollectionStatus>(collection.status),

        collectionContents: collection.collectionContents?.map((collectionContent: CollectionContent) => CollectionContent.clone<CollectionContent>(collectionContent)),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public name?: string;

  public slug?: string;

  public start?: Moment;

  public end?: Moment;

  public statusId?: number;

  public title?: string;

  public description?: string;

  public status?: CollectionStatus;

  public collectionContents?: CollectionContent[];

  public errors?: ErrorMap<Collection>;
}
