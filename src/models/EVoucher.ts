import {Model} from 'core';

import {Customer} from 'models/Customer';
import {EVoucherContent} from 'models/EVoucherContent';
import {Product} from 'models/Product';
import {Moment} from 'moment';

export class EVoucher extends Model {

  public id?: number;

  public customerId?: number;

  public productId?: number;

  public name?: string;

  public start?: string | Date | Moment;

  public end?: string | Date | Moment;

  public quantity?: number;

  public customer?: Customer;

  public product?: Product;

  public eVoucherContents?: EVoucherContent[];

  public constructor(eVoucher?: EVoucher) {
    super(eVoucher);
  }
}
