import {Model} from 'core';
import {MerchantAddress} from 'models/MerchantAddress';
import {MerchantContact} from 'models/MerchantContact';

import {MerchantStatus} from 'models/MerchantStatus';
import {Product} from 'models/Product';

export class Merchant extends Model {

  public id?: number;

  public name?: string;

  public phone?: string;

  public contactPerson?: string;

  public address?: string;

  public provinceId?: number;

  public statusId?: number;

  public disabled?: boolean;

  public status?: MerchantStatus;

  public merchantAddresses?: MerchantAddress[];

  public merchantContacts?: MerchantContact[];

  public products?: Product[];

  public constructor(merchant?: Merchant) {
    super(merchant);
  }
}
