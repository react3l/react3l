import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class ProductType extends Model {

  public static clone<T extends Model = ProductType>(productType?: PureModelData<ProductType>): T | null {
    const instance: T = new Model() as T;
    if (typeof productType !== 'undefined' && productType !== null) {
      Object.assign(instance, {
        ...productType,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public errors?: ErrorMap<ProductType>;
}
