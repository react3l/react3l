import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Coupon} from './Coupon';
import {ItemHistory} from './ItemHistory';
import {ItemVoucher} from './ItemVoucher';
import {Product} from './Product';

export class Item extends Model {

  public static clone<T extends Model = Item>(item?: PureModelData<Item>): T | null {
    const instance: T = new Model() as T;
    if (typeof item !== 'undefined' && item !== null) {
      Object.assign(instance, {
        ...item,

        product: Product.clone<Product>(item.product),

        itemHistories: item.itemHistories.map((itemHistory: ItemHistory) => ItemHistory.clone<ItemHistory>(itemHistory)),

        itemVouchers: item.itemVouchers.map((itemVoucher: ItemVoucher) => ItemVoucher.clone<ItemVoucher>(itemVoucher)),

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public productId?: number;

  public firstVariation?: string;

  public secondVariation?: string;

  public sKU?: string;

  public price?: number;

  public minPrice?: number;

  public userPrice?: number;

  public customerPrice?: number;

  public quantity?: number;

  public disabled?: boolean;

  public product?: Product;

  public coupons?: Coupon[];

  public itemHistories?: ItemHistory[];

  public itemVouchers?: ItemVoucher[];

  public errors?: ErrorMap<Item>;
}
