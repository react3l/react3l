import {SorterResult} from 'antd/lib/table';
import {Model} from './Model';

export const DEFAULT_TAKE: number = 10;

export type SearchOrderType = 'asc' | 'desc' | undefined | null | boolean;

export class Search extends Model {

  [key: string]: any;

  public static setOrderType(search: Search, orderType: string | null | undefined | boolean) {
    if (typeof orderType === 'undefined') {
      search.orderType = undefined;
      return;
    }
    if (typeof orderType === 'string') {
      if (orderType.toLowerCase().startsWith('asc')) {
        search.orderType = 'asc';
        return;
      }
      search.orderType = 'desc';
      return;
    }
    if (typeof orderType === 'boolean') {
      if (orderType) {
        return 'asc';
      }
      search.orderType = 'desc';
      return 'desc';
    }
    search.orderType = undefined;
  }

  public static getOrderType(search: Search) {
    if (search.orderType) {
      if (search.orderType === 'asc') {
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

  public orderType?: SearchOrderType;
}
