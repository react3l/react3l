import {IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class CategorySearch extends Search {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public slug?: StringFilter = new StringFilter();

  public pathId?: StringFilter = new StringFilter();

  public level?: NumberFilter = new NumberFilter();

  public parentId?: IdFilter = new IdFilter();

  public imageId?: IdFilter = new IdFilter();

  public title?: StringFilter = new StringFilter();

  public description?: StringFilter = new StringFilter();
}
