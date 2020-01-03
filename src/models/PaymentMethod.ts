import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Product} from './Product';

export class PaymentMethod extends Model {

  public static clone<T extends Model = PaymentMethod>(paymentMethod?: PureModelData<PaymentMethod>): T | null {
    const instance: T = new Model() as T;
    if (typeof paymentMethod !== 'undefined' && paymentMethod !== null) {
      Object.assign(instance, {
        ...paymentMethod,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public description?: string;

  public products?: Product[];

  public errors?: ErrorMap<PaymentMethod>;
}
