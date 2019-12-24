import {ListFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class ProvinceSearch extends Search {
  public id?: NumberFilter = new NumberFilter();

  public name?: StringFilter = new StringFilter();

  public provinceTypeId?: ListFilter = new ListFilter();
}
