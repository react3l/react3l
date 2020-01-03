import {IdFilter} from 'core/filters';
import {Search} from 'core/models';

export class BrandCategoryMappingSearch extends Search {
  public brandId?: IdFilter = new IdFilter();

  public categoryId?: IdFilter = new IdFilter();
}
