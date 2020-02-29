import {ModelFilter} from 'core/models/ModelFilter';
import {IdFilter, StringFilter} from 'core/filters';

export class DistrictFilter extends ModelFilter {
  public id: IdFilter = new IdFilter();

  public name: StringFilter = new StringFilter();

  public provinceId: IdFilter = new IdFilter();
}
