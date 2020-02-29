import {IdFilter, StringFilter} from 'core/filters';
import {ModelFilter} from 'core/models';

export class WardFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();

  public wardTypeId?: IdFilter = new IdFilter();

  public districtId?: IdFilter = new IdFilter();
}
