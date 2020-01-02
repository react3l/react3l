import {Model} from 'core';

import {Merchant} from 'models/Merchant';

export class MerchantAddress extends Model {

  public id?: number;

  public merchantId?: number;

  public code?: string;

  public address?: string;

  public contact?: string;

  public phone?: string;

  public disabled?: boolean;

  public merchant?: Merchant;

  public constructor(merchantAddress?: MerchantAddress) {
    super(merchantAddress);
  }
}
