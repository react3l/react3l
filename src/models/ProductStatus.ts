import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class ProductStatus extends Model {

  public static clone<T extends Model = ProductStatus>(productStatus?: PureModelData<ProductStatus>): T | null {
    const instance: T = new Model() as T;
    if (typeof productStatus !== 'undefined' && productStatus !== null) {
      Object.assign(instance, {
        ...productStatus,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public errors?: ErrorMap<ProductStatus>;
}
