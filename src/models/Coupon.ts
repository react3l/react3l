import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {CouponType} from './CouponType';
import {Customer} from './Customer';
import {ImageFile} from './ImageFile';
import {Item} from './Item';

export class Coupon extends Model {

  public static clone<T extends Model = Coupon>(coupon?: PureModelData<Coupon>): T | null {
    const instance: T = new Model() as T;
    if (typeof coupon !== 'undefined' && coupon !== null) {
      Object.assign(instance, {
        ...coupon,

        start: moment(coupon.start),

        end: moment(coupon.end),

        image: ImageFile.clone<ImageFile>(coupon.image),

        type: CouponType.clone<CouponType>(coupon.type),

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public start?: Moment;

  public end?: Moment;

  public typeId?: number;

  public value?: number;

  public maxAmount?: number;

  public quantity?: number;

  public usageLimitPerCustomer?: number;

  public description?: string;

  public appliedAllCustomers?: boolean;

  public appliedAllItems?: boolean;

  public imageId?: number;

  public image?: ImageFile;

  public type?: CouponType;

  public customers?: Customer[];

  public items?: Item[];

  public errors?: ErrorMap<Coupon>;
}
