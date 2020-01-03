import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class ImageFileSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public key?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();

  public url?: StringFilter = new StringFilter();

  public thumbUrl?: StringFilter = new StringFilter();

  public originUrl?: StringFilter = new StringFilter();
}
