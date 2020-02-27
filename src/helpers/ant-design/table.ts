import {PaginationProps} from 'antd/lib/pagination';
import {SorterResult} from 'antd/lib/table';
import {DEFAULT_TAKE} from 'core/config';
import nameof from 'ts-nameof.macro';
import {antSortType} from 'config/ant-design/form';
import {Model, ModelFilter} from 'core/models';

export function setOrderType(filter: ModelFilter, orderType: string | null | undefined | boolean) {
  if (typeof orderType === 'undefined') {
    filter.orderType = undefined;
    return;
  }
  if (typeof orderType === 'string') {
    if (orderType.toUpperCase().startsWith(nameof(antSortType.ASC))) {
      filter.orderType = nameof(antSortType.ASC);
      return;
    }
    filter.orderType = nameof(antSortType.DESC);
    return;
  }
  if (typeof orderType === 'boolean') {
    if (orderType) {
      return nameof(antSortType.ASC);
    }
    filter.orderType = nameof(antSortType.DESC);
    return nameof(antSortType.DESC);
  }
  filter.orderType = undefined;
}

export function getOrderType(filter: ModelFilter): 'ascend' | 'descend' | undefined {
  if (filter.orderType) {
    if (filter.orderType === nameof(antSortType.ASC)) {
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
