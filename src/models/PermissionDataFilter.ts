import {IdFilter, StringFilter} from 'core/filters';
import {ModelFilter} from 'core/models';

export class PermissionDataFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public permissionId?: IdFilter = new IdFilter();

  public filterName?: StringFilter = new StringFilter();

  public filterType?: StringFilter = new StringFilter();

  public filterValue?: StringFilter = new StringFilter();
}
