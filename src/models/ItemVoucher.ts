import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Item} from './Item';
import {ItemVoucherStatus} from './ItemVoucherStatus';
import {Order} from './Order';

export class ItemVoucher extends Model {

  public static clone<T extends Model = ItemVoucher>(itemVoucher?: PureModelData<ItemVoucher>): T | null {
    const instance: T = new Model() as T;
    if (typeof itemVoucher !== 'undefined' && itemVoucher !== null) {
      Object.assign(instance, {
        ...itemVoucher,

        item: Item.clone<Item>(itemVoucher.item),

        order: Order.clone<Order>(itemVoucher.order),

        status: ItemVoucherStatus.clone<ItemVoucherStatus>(itemVoucher.status),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public itemId?: number;

  public code?: string;

  public merchantAddressCode?: string;

  public customerCode?: string;

  public statusId?: number;

  public orderId?: number;

  public disabled?: boolean;

  public item?: Item;

  public order?: Order;

  public status?: ItemVoucherStatus;

  public errors?: ErrorMap<ItemVoucher>;
}
