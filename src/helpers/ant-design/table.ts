import {PaginationProps} from 'antd/lib/pagination';
import {SorterResult} from 'antd/lib/table';
import {antSortType} from 'config/ant-design/ant-design';
import {DEFAULT_TAKE} from 'core/config';
import {Model, Search} from 'core/models';
import nameof from 'ts-nameof.macro';

export function setOrderType(search: Search, orderType: string | null | undefined | boolean) {
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

export function getOrderType(search: Search): 'ascend' | 'descend' | undefined {
  if (search.orderType) {
    if (search.orderType === nameof(antSortType.ASC)) {
      return 'ascend';
    }
    return 'descend';
  }
  return undefined;
}

export function getOrderTypeForTable<T extends Model>(field: string, sorter: SorterResult<T>) {
  return (field === sorter.field) ? sorter.order : undefined;
}

export function renderMasterIndex<T extends Model>(pagination?: PaginationProps) {
  return (...[, , index]: [any, T, number]) => {
    if (pagination) {
      const {
        current = 1, pageSize = DEFAULT_TAKE,
      } = pagination;
      return index + 1 + (current - 1) * pageSize;
    }
    return index + 1;
  };
}
