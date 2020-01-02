import {Model} from 'core';

import {CustomerGrouping} from 'models/CustomerGrouping';
import {DiscountContent} from 'models/DiscountContent';
import {DiscountStatus} from 'models/DiscountStatus';
import {DiscountType} from 'models/DiscountType';
import {Moment} from 'moment';

export class Discount extends Model {

  public id?: number;

  public name?: string;

  public start?: string | Date | Moment;

  public end?: string | Date | Moment;

  public typeId?: number;

  public statusId?: number;

  public value?: number;

  public customerGroupingId?: number;

  public customerGrouping?: CustomerGrouping;

  public status?: DiscountStatus;

  public type?: DiscountType;

  public discountContents?: DiscountContent[];

  public constructor(discount?: Discount) {
    super(discount);
  }
}
