import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {CustomerGrouping} from './CustomerGrouping';
import {DiscountContent} from './DiscountContent';
import {DiscountStatus} from './DiscountStatus';
import {DiscountType} from './DiscountType';

export class Discount extends Model {

  public static clone<T extends Model = Discount>(discount?: PureModelData<Discount>): T | null {
    const instance: T = new Model() as T;
    if (typeof discount !== 'undefined' && discount !== null) {
      Object.assign(instance, {
        ...discount,

        start: moment(discount.start),

        end: moment(discount.end),

        customerGrouping: CustomerGrouping.clone<CustomerGrouping>(discount.customerGrouping),

        status: DiscountStatus.clone<DiscountStatus>(discount.status),

        type: DiscountType.clone<DiscountType>(discount.type),

        discountContents: discount.discountContents.map((discountContent: DiscountContent) => DiscountContent.clone<DiscountContent>(discountContent)),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public name?: string;

  public start?: Moment;

  public end?: Moment;

  public typeId?: number;

  public statusId?: number;

  public value?: number;

  public customerGroupingId?: number;

  public customerGrouping?: CustomerGrouping;

  public status?: DiscountStatus;

  public type?: DiscountType;

  public discountContents?: DiscountContent[];

  public errors?: ErrorMap<Discount>;
}
