import {SorterResult} from 'antd/lib/table';
import {SortType} from 'core/types';
import {Cloneable} from './Cloneable';

export const DEFAULT_TAKE: number = 10;

export class Search extends Cloneable {
  public static setOrderType(search: Search, orderType: string | null | undefined | boolean) {
    if (typeof orderType === 'undefined') {
      search.orderType = undefined;
      return;
    }
    if (typeof orderType === 'string') {
      if (orderType.toUpperCase().startsWith('ASC')) {
        search.orderType = 'ASC';
        return;
      }
      search.orderType = 'DESC';
      return;
    }
    if (typeof orderType === 'boolean') {
      if (orderType) {
        return 'ASC';
      }
      search.orderType = 'DESC';
      return 'DESC';
    }
    search.orderType = undefined;
  }

  public static getOrderType(search: Search) {
    if (search.orderType) {
      if (search.orderType === 'ASC') {
        return 'ascend';
      }
      return 'descend';
    }
    return undefined;
  }

  public static getOrderTypeForTable<TSearch extends Search>(field: string, sorter: SorterResult<TSearch>) {
    return (field === sorter.field) ? sorter.order : undefined;
  }

  public skip?: number = 0;

  public take?: number = DEFAULT_TAKE;

  public orderBy?: string;

  public orderType?: SortType;
}
