import {DateFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class CouponSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public start?: DateFilter = new DateFilter();

  public end?: DateFilter = new DateFilter();

  public typeId?: IdFilter = new IdFilter();

  public value?: NumberFilter = new NumberFilter();

  public maxAmount?: NumberFilter = new NumberFilter();

  public quantity?: NumberFilter = new NumberFilter();

  public usageLimitPerCustomer?: NumberFilter = new NumberFilter();

  public description?: StringFilter = new StringFilter();

  public imageId?: IdFilter = new IdFilter();
}
