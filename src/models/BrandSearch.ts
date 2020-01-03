import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class BrandSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public slug?: StringFilter = new StringFilter();

  public title?: StringFilter = new StringFilter();

  public description?: StringFilter = new StringFilter();
}
