import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Item} from './Item';
import {Order} from './Order';

export class OrderContent extends Model {

  public static clone<T extends Model = OrderContent>(orderContent?: PureModelData<OrderContent>): T | null {
    const instance: T = new Model() as T;
    if (typeof orderContent !== 'undefined' && orderContent !== null) {
      Object.assign(instance, {
        ...orderContent,

        item: Item.clone<Item>(orderContent.item),

        order: Order.clone<Order>(orderContent.order),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public orderId?: number;

  public itemId?: number;

  public discountPrice?: number;

  public quantity?: number;

  public disabled?: boolean;

  public voucherCode?: string;

  public item?: Item;

  public order?: Order;

  public errors?: ErrorMap<OrderContent>;
}
