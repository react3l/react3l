import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class ProvinceSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public provinceTypeId?: IdFilter = new IdFilter();
}
