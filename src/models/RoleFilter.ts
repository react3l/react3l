import {IdFilter, StringFilter} from 'core/filters';
import {ModelFilter} from 'core/models';

export class RoleFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();
}
