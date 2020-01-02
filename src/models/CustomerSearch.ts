import {Search} from 'core/models/Search';

export class CustomerSearch extends Search {

  public id?: number;

  public username?: string;

  public displayName?: string;

  public phoneNumber?: string;

  public email?: string;

  public customerGroupingId?: number;

  public disabled?: boolean;

}
