import {Search} from 'core/models/Search';
import {Moment} from 'moment';

export class EVoucherContentSearch extends Search {

  public id?: number;

  public eVoucherId?: number;

  public usedCode?: string;

  public merchantCode?: string;

  public usedDate?: string | Date | Moment;

}
