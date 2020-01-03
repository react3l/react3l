import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {Customer} from './Customer';
import {EVoucherContent} from './EVoucherContent';
import {Product} from './Product';

export class EVoucher extends Model {

  public static clone<T extends Model = EVoucher>(eVoucher?: PureModelData<EVoucher>): T | null {
    const instance: T = new Model() as T;
    if (typeof eVoucher !== 'undefined' && eVoucher !== null) {
      Object.assign(instance, {
        ...eVoucher,

        start: moment(eVoucher.start),

        end: moment(eVoucher.end),

        customer: Customer.clone<Customer>(eVoucher.customer),

        product: Product.clone<Product>(eVoucher.product),

        eVoucherContents: eVoucher.eVoucherContents.map((eVoucherContent: EVoucherContent) => EVoucherContent.clone<EVoucherContent>(eVoucherContent)),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public customerId?: number;

  public productId?: number;

  public name?: string;

  public start?: Moment;

  public end?: Moment;

  public quantity?: number;

  public customer?: Customer;

  public product?: Product;

  public eVoucherContents?: EVoucherContent[];

  public errors?: ErrorMap<EVoucher>;
}
