import {DEFAULT_TAKE, INITIAL_SKIP} from 'config/consts';
import {OrderType} from 'core/order-type';
import {Model} from 'core/model';

/**
 * App model filter
 */
export class ModelFilter<T extends Model = any> {
  /**
   * Skip number
   *
   * @type {number}
   */
  public skip: number = INITIAL_SKIP;

  /**
   * Take number
   *
   * @type {number}
   */
  public take: number = DEFAULT_TAKE;

  /**
   * Field name to order by
   *
   * @type {string}
   */
  public orderBy?: keyof T | string;

  /**
   * Order type
   *
   * @type {OrderType}
   */
  public orderType?: OrderType;

  /**
   * Filter fields
   */
  [key: string]: any;
}
