import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {Customer} from './Customer';

export class Notification extends Model {

  public static clone<T extends Model = Notification>(notification?: PureModelData<Notification>): T | null {
    const instance: T = new Model() as T;
    if (typeof notification !== 'undefined' && notification !== null) {
      Object.assign(instance, {
        ...notification,

        createdDate: moment(notification.createdDate),

        customer: Customer.clone<Customer>(notification.customer),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public customerId?: number;

  public subject?: string;

  public content?: string;

  public link?: string;

  public unread?: boolean;

  public typeId?: number;

  public createdDate?: Moment;

  public customer?: Customer;

  public errors?: ErrorMap<Notification>;
}
