import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class CouponType extends Model {

  public static clone<T extends Model = CouponType>(couponType?: PureModelData<CouponType>): T | null {
    const instance: T = new Model() as T;
    if (typeof couponType !== 'undefined' && couponType !== null) {
      Object.assign(instance, {
        ...couponType,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public errors?: ErrorMap<CouponType>;
}
