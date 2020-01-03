import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class DiscountType extends Model {

  public static clone<T extends Model = DiscountType>(discountType?: PureModelData<DiscountType>): T | null {
    const instance: T = new Model() as T;
    if (typeof discountType !== 'undefined' && discountType !== null) {
      Object.assign(instance, {
        ...discountType,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public errors?: ErrorMap<DiscountType>;
}
