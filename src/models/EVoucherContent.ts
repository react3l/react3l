import {Model} from 'core';

import {EVoucher} from 'models/EVoucher';
import {Moment} from 'moment';

export class EVoucherContent extends Model {

  public id?: number;

  public eVoucherId?: number;

  public usedCode?: string;

  public merchantCode?: string;

  public usedDate?: string | Date | Moment;

  public eVoucher?: EVoucher;

  public constructor(eVoucherContent?: EVoucherContent) {
    super(eVoucherContent);
  }
}
