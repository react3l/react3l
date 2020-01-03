import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {MerchantAddress} from './MerchantAddress';
import {MerchantContact} from './MerchantContact';
import {MerchantStatus} from './MerchantStatus';

export class Merchant extends Model {

  public static clone<T extends Model = Merchant>(merchant?: PureModelData<Merchant>): T | null {
    const instance: T = new Model() as T;
    if (typeof merchant !== 'undefined' && merchant !== null) {
      Object.assign(instance, {
        ...merchant,

        status: MerchantStatus.clone<MerchantStatus>(merchant.status),

        merchantAddresses: merchant.merchantAddresses?.map((merchantAddress: MerchantAddress) => MerchantAddress.clone<MerchantAddress>(merchantAddress)),

        merchantContacts: merchant.merchantContacts?.map((merchantContact: MerchantContact) => MerchantContact.clone<MerchantContact>(merchantContact)),

      });
      return instance;
    }
    return null;
  }

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

  public errors?: ErrorMap<Merchant>;
}
