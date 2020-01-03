import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {Discount} from './Discount';
import {Item} from './Item';

export class DiscountContent extends Model {

  public static clone<T extends Model = DiscountContent>(discountContent?: PureModelData<DiscountContent>): T | null {
    const instance: T = new Model() as T;
    if (typeof discountContent !== 'undefined' && discountContent !== null) {
      Object.assign(instance, {
        ...discountContent,

        start: moment(discountContent.start),

        end: moment(discountContent.end),

        discount: Discount.clone<Discount>(discountContent.discount),

        item: Item.clone<Item>(discountContent.item),
      });
      return instance;
    }
    return null;
  }

  public itemId?: number;

  public discountId?: number;

  public start?: Moment;

  public end?: Moment;

  public typeId?: number;

  public statusId?: number;

  public value?: number;

  public customerGroupingId?: number;

  public discount?: Discount;

  public item?: Item;

  public errors?: ErrorMap<DiscountContent>;
}
