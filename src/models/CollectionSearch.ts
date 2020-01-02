import {Search} from 'core/models/Search';
import {Moment} from 'moment';

export class CollectionSearch extends Search {

  public id?: number;

  public name?: string;

  public start?: string | Date | Moment;

  public end?: string | Date | Moment;

  public statusId?: number;

}
