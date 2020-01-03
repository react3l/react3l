import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Merchant} from './Merchant';

export class MerchantContact extends Model {

  public static clone<T extends Model = MerchantContact>(merchantContact?: PureModelData<MerchantContact>): T | null {
    const instance: T = new Model() as T;
    if (typeof merchantContact !== 'undefined' && merchantContact !== null) {
      Object.assign(instance, {
        ...merchantContact,

        merchant: Merchant.clone<Merchant>(merchantContact.merchant),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public merchantId?: number;

  public name?: string;

  public email?: string;

  public phone?: string;

  public note?: string;

  public disabled?: boolean;

  public merchant?: Merchant;

  public errors?: ErrorMap<MerchantContact>;
}
