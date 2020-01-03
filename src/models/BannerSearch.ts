import {IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class BannerSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public src?: StringFilter = new StringFilter();

  public alt?: StringFilter = new StringFilter();

  public caption?: StringFilter = new StringFilter();

  public link?: StringFilter = new StringFilter();

  public priority?: NumberFilter = new NumberFilter();

  public typeId?: IdFilter = new IdFilter();

  public imageId?: IdFilter = new IdFilter();
}
