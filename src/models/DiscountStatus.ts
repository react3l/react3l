import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class DiscountStatus extends Model {

  public static clone<T extends Model = DiscountStatus>(discountStatus?: PureModelData<DiscountStatus>): T | null {
    const instance: T = new Model() as T;
    if (typeof discountStatus !== 'undefined' && discountStatus !== null) {
      Object.assign(instance, {
        ...discountStatus,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public errors?: ErrorMap<DiscountStatus>;
}
