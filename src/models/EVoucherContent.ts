import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {EVoucher} from './EVoucher';

export class EVoucherContent extends Model {

  public static clone<T extends Model = EVoucherContent>(eVoucherContent?: PureModelData<EVoucherContent>): T | null {
    const instance: T = new Model() as T;
    if (typeof eVoucherContent !== 'undefined' && eVoucherContent !== null) {
      Object.assign(instance, {
        ...eVoucherContent,

        usedDate: moment(eVoucherContent.usedDate),

        eVoucher: EVoucher.clone<EVoucher>(eVoucherContent.eVoucher),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public eVoucherId?: number;

  public usedCode?: string;

  public merchantCode?: string;

  public usedDate?: Moment;

  public eVoucher?: EVoucher;

  public errors?: ErrorMap<EVoucherContent>;
}
