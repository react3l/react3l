import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class CustomerGrouping extends Model {

  public static clone<T extends Model = CustomerGrouping>(customerGrouping?: PureModelData<CustomerGrouping>): T | null {
    const instance: T = new Model() as T;
    if (typeof customerGrouping !== 'undefined' && customerGrouping !== null) {
      Object.assign(instance, {
        ...customerGrouping,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public errors?: ErrorMap<CustomerGrouping>;
}
