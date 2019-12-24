import {ListFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class DistrictSearch extends Search {
  public id?: NumberFilter = new NumberFilter();

  public name?: StringFilter = new StringFilter();

  public provinceId?: ListFilter = new ListFilter();

  public districtTypeId?: ListFilter = new ListFilter();
}
