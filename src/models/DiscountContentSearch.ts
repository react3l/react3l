import {DateFilter, IdFilter, NumberFilter} from 'core/filters';
import {Search} from 'core/models';

export class DiscountContentSearch extends Search {
  public itemId?: IdFilter = new IdFilter();

  public discountId?: IdFilter = new IdFilter();

  public start?: DateFilter = new DateFilter();

  public end?: DateFilter = new DateFilter();

  public typeId?: IdFilter = new IdFilter();

  public statusId?: IdFilter = new IdFilter();

  public value?: NumberFilter = new NumberFilter();

  public customerGroupingId?: IdFilter = new IdFilter();
}
