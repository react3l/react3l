import {Model} from 'core/models';
import {ErrorMap} from 'core/types';
import {Moment} from 'moment';
import {Administrator} from './Administrator';
import {Item} from './Item';

export class ItemHistory extends Model {
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
