import {Model} from 'core';

import {Merchant} from 'models/Merchant';

export class MerchantStatus extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public merchants?: Merchant[];

  public constructor(merchantStatus?: MerchantStatus) {
    super(merchantStatus);
  }
}
