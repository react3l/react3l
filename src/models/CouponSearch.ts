import {Search} from 'core/models/Search';
import {Moment} from 'moment';

export class CouponSearch extends Search {

  public id?: number;

  public code?: string;

  public start?: string | Date | Moment;

  public end?: string | Date | Moment;

  public typeId?: number;

  public value?: number;

  public maxAmount?: number;

  public quantity?: number;

  public usageLimitPerCustomer?: number;

  public description?: string;

  public appliedAllCustomers?: boolean;

  public appliedAllItems?: boolean;

  public imageId?: number;

}
