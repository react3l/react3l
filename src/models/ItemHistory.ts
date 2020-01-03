import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {Administrator} from './Administrator';
import {Item} from './Item';

export class ItemHistory extends Model {

  public static clone<T extends Model = ItemHistory>(itemHistory?: PureModelData<ItemHistory>): T | null {
    const instance: T = new Model() as T;
    if (typeof itemHistory !== 'undefined' && itemHistory !== null) {
      Object.assign(instance, {
        ...itemHistory,

        createdDate: moment(itemHistory.createdDate),

        administrator: Administrator.clone<Administrator>(itemHistory.administrator),

        item: Item.clone<Item>(itemHistory.item),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public itemId?: number;

  public price?: number;

  public minPrice?: number;

  public userPrice?: number;

  public customerPrice?: number;

  public stock?: number;

  public createdDate?: Moment;

  public administratorId?: number;

  public disabled?: boolean;

  public administrator?: Administrator;

  public item?: Item;

  public errors?: ErrorMap<ItemHistory>;
}
