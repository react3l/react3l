import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class CustomerSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public username?: StringFilter = new StringFilter();

  public displayName?: StringFilter = new StringFilter();

  public phoneNumber?: StringFilter = new StringFilter();

  public email?: StringFilter = new StringFilter();

  public customerGroupingId?: IdFilter = new IdFilter();
}
