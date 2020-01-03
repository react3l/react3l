import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class AdministratorSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public username?: StringFilter = new StringFilter();

  public displayName?: StringFilter = new StringFilter();

  public picture?: StringFilter = new StringFilter();
}
