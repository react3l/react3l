import {SorterResult} from 'antd/lib/table';
import nameof from 'ts-nameof.macro';
import {antSortType, DEFAULT_TAKE} from '../config';
import {Cloneable} from './Cloneable';
import {Model} from './Model';

export class Search extends Cloneable {
  public static setOrderType(search: Search, orderType: string | null | undefined | boolean) {
    if (typeof orderType === 'undefined') {
      search.orderType = undefined;
      return;
    }
    if (typeof orderType === 'string') {
      if (orderType.toUpperCase().startsWith(nameof(antSortType.ASC))) {
        search.orderType = nameof(antSortType.ASC);
        return;
      }
      search.orderType = nameof(antSortType.DESC);
      return;
    }
    if (typeof orderType === 'boolean') {
      if (orderType) {
        return nameof(antSortType.ASC);
      }
      search.orderType = nameof(antSortType.DESC);
      return nameof(antSortType.DESC);
    }
    search.orderType = undefined;
  }

  public static getOrderType(search: Search): 'ascend' | 'descend' | undefined {
    if (search.orderType) {
      if (search.orderType === nameof(antSortType.ASC)) {
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
