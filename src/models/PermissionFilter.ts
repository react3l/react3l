import {IdFilter, StringFilter} from 'core/filters';
import {ModelFilter} from 'core/models';

export class PermissionFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public roleId?: IdFilter = new IdFilter();
}
