import {Search} from 'core/models/Search';
import {Moment} from 'moment';

export class DiscountSearch extends Search {

  public id?: number;

  public name?: string;

  public start?: string | Date | Moment;

  public end?: string | Date | Moment;

  public typeId?: number;

  public statusId?: number;

  public value?: number;

  public customerGroupingId?: number;

}
