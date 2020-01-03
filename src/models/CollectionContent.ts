import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Collection} from './Collection';
import {Product} from './Product';

export class CollectionContent extends Model {

  public static clone<T extends Model = CollectionContent>(collectionContent?: PureModelData<CollectionContent>): T | null {
    const instance: T = new Model() as T;
    if (typeof collectionContent !== 'undefined' && collectionContent !== null) {
      Object.assign(instance, {
        ...collectionContent,

        collection: Collection.clone<Collection>(collectionContent.collection),

        product: Product.clone<Product>(collectionContent.product),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public collectionId?: number;

  public priority?: number;

  public productId?: number;

  public collection?: Collection;

  public product?: Product;

  public errors?: ErrorMap<CollectionContent>;
}
