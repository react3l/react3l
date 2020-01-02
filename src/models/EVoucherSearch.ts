import {Search} from 'core/models/Search';
import {Moment} from 'moment';

export class EVoucherSearch extends Search {

  public id?: number;

  public customerId?: number;

  public productId?: number;

  public name?: string;

  public start?: string | Date | Moment;

  public end?: string | Date | Moment;

  public quantity?: number;

}
