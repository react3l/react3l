import {DEFAULT_TAKE, INITIAL_SKIP} from 'config/consts';
import {OrderType} from 'core/order-type';
import {Model} from 'core/model';

/**
 * App model filter
 */
export class ModelFilter<T extends Model = any> {
  public skip: number = INITIAL_SKIP;

  public take: number = DEFAULT_TAKE;

  public orderBy?: keyof T | string;

  public orderType?: OrderType;

  [key: string]: any;
}
