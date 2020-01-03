import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class ItemVoucherStatus extends Model {

  public static clone<T extends Model = ItemVoucherStatus>(itemVoucherStatus?: PureModelData<ItemVoucherStatus>): T | null {
    const instance: T = new Model() as T;
    if (typeof itemVoucherStatus !== 'undefined' && itemVoucherStatus !== null) {
      Object.assign(instance, {
        ...itemVoucherStatus,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public errors?: ErrorMap<ItemVoucherStatus>;
}
