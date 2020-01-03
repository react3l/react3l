import {DateFilter, IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class EVoucherContentSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public eVoucherId?: IdFilter = new IdFilter();

  public usedCode?: StringFilter = new StringFilter();

  public merchantCode?: StringFilter = new StringFilter();

  public usedDate?: DateFilter = new DateFilter();
}
