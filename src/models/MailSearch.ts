import {IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class MailSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public subject?: StringFilter = new StringFilter();

  public body?: StringFilter = new StringFilter();

  public receivers?: StringFilter = new StringFilter();

  public tryCount?: NumberFilter = new NumberFilter();

  public errorMessage?: StringFilter = new StringFilter();
}
