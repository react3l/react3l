import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class OrderStatus extends Model {

  public static clone<T extends Model = OrderStatus>(orderStatus?: PureModelData<OrderStatus>): T | null {
    const instance: T = new Model() as T;
    if (typeof orderStatus !== 'undefined' && orderStatus !== null) {
      Object.assign(instance, {
        ...orderStatus,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public description?: string;

  public errors?: ErrorMap<OrderStatus>;
}
