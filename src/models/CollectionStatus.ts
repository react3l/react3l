import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class CollectionStatus extends Model {

  public static clone<T extends Model = CollectionStatus>(collectionStatus?: PureModelData<CollectionStatus>): T | null {
    const instance: T = new Model() as T;
    if (typeof collectionStatus !== 'undefined' && collectionStatus !== null) {
      Object.assign(instance, {
        ...collectionStatus,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public errors?: ErrorMap<CollectionStatus>;
}
