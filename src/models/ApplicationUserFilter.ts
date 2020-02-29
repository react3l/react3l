import {IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {ModelFilter} from 'core/models';

export class ApplicationUserFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public username?: StringFilter = new StringFilter();

  public password?: StringFilter = new StringFilter();

  public displayName?: StringFilter = new StringFilter();

  public email?: StringFilter = new StringFilter();

  public phone?: StringFilter = new StringFilter();

  public userStatusId?: IdFilter = new IdFilter();

  public retryTime?: NumberFilter = new NumberFilter();

  public providerId?: IdFilter = new IdFilter();
}
