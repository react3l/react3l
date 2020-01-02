import {Model} from 'core';

import {Merchant} from 'models/Merchant';

export class MerchantContact extends Model {

  public id?: number;

  public merchantId?: number;

  public name?: string;

  public email?: string;

  public phone?: string;

  public note?: string;

  public disabled?: boolean;

  public merchant?: Merchant;

  public constructor(merchantContact?: MerchantContact) {
    super(merchantContact);
  }
}
