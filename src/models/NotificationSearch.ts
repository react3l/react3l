import {DateFilter, IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class NotificationSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public customerId?: IdFilter = new IdFilter();

  public subject?: StringFilter = new StringFilter();

  public content?: StringFilter = new StringFilter();

  public link?: StringFilter = new StringFilter();

  public typeId?: IdFilter = new IdFilter();

  public createdDate?: DateFilter = new DateFilter();
}
