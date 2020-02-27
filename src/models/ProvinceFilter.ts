import {ModelFilter} from 'core/models/ModelFilter';
import {IdFilter, StringFilter} from 'core/filters';

export class ProvinceFilter extends ModelFilter {
  public id: IdFilter = new IdFilter();

  public name: StringFilter = new StringFilter();

  public code: StringFilter = new StringFilter();
}
