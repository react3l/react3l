import {DateFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class DiscountSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public start?: DateFilter = new DateFilter();

  public end?: DateFilter = new DateFilter();

  public typeId?: IdFilter = new IdFilter();

  public statusId?: IdFilter = new IdFilter();

  public value?: NumberFilter = new NumberFilter();

  public customerGroupingId?: IdFilter = new IdFilter();
}
