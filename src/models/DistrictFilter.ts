import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class DistrictFilter extends Search {
  public id?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();

  public provinceId?: IdFilter = new IdFilter();
}
