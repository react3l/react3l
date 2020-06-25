import {DEFAULT_TAKE, INITIAL_SKIP} from 'config/consts';
import {OrderType} from 'core/order-type';
import {Model} from 'core/model';

export class ModelFilter<T extends Model> {
  public skip: number = INITIAL_SKIP;

  public take: number = DEFAULT_TAKE;

  public orderBy?: Exclude<T, 'errors'>;

  public orderType?: OrderType;
}
