import {IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {ModelFilter} from 'core/models';

export class SiteFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public uRL?: StringFilter = new StringFilter();

  public status?: NumberFilter = new NumberFilter();
}
