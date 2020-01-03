import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {Customer} from './Customer';
import {District} from './District';
import {OrderContent} from './OrderContent';
import {OrderStatus} from './OrderStatus';
import {PaymentMethod} from './PaymentMethod';
import {Province} from './Province';
import {Ward} from './Ward';

export class Order extends Model {

  public static clone<T extends Model = Order>(order?: PureModelData<Order>): T | null {
    const instance: T = new Model() as T;
    if (typeof order !== 'undefined' && order !== null) {
      Object.assign(instance, {
        ...order,

        createdDate: moment(order.createdDate),

        customer: Customer.clone<Customer>(order.customer),

        district: District.clone<District>(order.district),

        paymentMethod: PaymentMethod.clone<PaymentMethod>(order.paymentMethod),

        province: Province.clone<Province>(order.province),

        status: OrderStatus.clone<OrderStatus>(order.status),

        ward: Ward.clone<Ward>(order.ward),

        orderContents: order.orderContents.map((orderContent: OrderContent) => OrderContent.clone<OrderContent>(orderContent)),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public customerId?: number;

  public createdDate?: Moment;

  public couponCode?: string;

  public total?: number;

  public couponAmount?: number;

  public statusId?: number;

  public address?: string;

  public provinceId?: number;

  public districtId?: number;

  public wardId?: number;

  public phoneNumber?: string;

  public paymentMethodId?: number;

  public customer?: Customer;

  public district?: District;

  public paymentMethod?: PaymentMethod;

  public province?: Province;

  public status?: OrderStatus;

  public ward?: Ward;

  public orderContents?: OrderContent[];

  public errors?: ErrorMap<Order>;
}
