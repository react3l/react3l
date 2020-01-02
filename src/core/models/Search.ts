import {SorterResult} from 'antd/lib/table';
import nameof from 'ts-nameof.macro';
import {DEFAULT_TAKE, SORT_TYPES} from '../config';
import {Model} from '../models/Model';
import {Cloneable} from './Cloneable';

export class Search extends Cloneable {

  public static setOrderType(search: Search, orderType: string | null | undefined | boolean) {
    if (typeof orderType === 'undefined') {
      search.orderType = undefined;
      return;
    }
    if (typeof orderType === 'string') {
      if (orderType.toUpperCase().startsWith(nameof(SORT_TYPES.ASC))) {
        search.orderType = nameof(SORT_TYPES.ASC);
        return;
      }
      search.orderType = nameof(SORT_TYPES.DESC);
      return;
    }
    if (typeof orderType === 'boolean') {
      if (orderType) {
        return nameof(SORT_TYPES.ASC);
      }
      search.orderType = nameof(SORT_TYPES.DESC);
      return nameof(SORT_TYPES.DESC);
    }
    search.orderType = undefined;
  }

  public static getOrderType(search: Search) {
    if (search.orderType) {
      if (search.orderType === nameof(SORT_TYPES.ASC)) {
        return 'ascend';
      }
      return 'descend';
    }
    return undefined;
  }

  public static getOrderTypeForTable<T extends Model>(field: string, sorter: SorterResult<T>) {
    return (field === sorter.field) ? sorter.order : undefined;
  }

  public skip?: number = 0;

  public take?: number = DEFAULT_TAKE;

  public orderBy?: string;

  public orderType?: string;
}
