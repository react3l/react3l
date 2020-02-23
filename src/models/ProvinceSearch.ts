import {StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class ProvinceSearch extends Search {
  public code?: StringFilter = new StringFilter();
}
