import {PaginationProps} from 'antd/lib/pagination';
import {SorterResult} from 'antd/lib/table';
import {Model, Search} from 'core/models';
import {DEFAULT_TAKE, SearchOrderType} from 'core/models/Search';
import React from 'react';

export type UseMasterTableResult<T extends Model, TSearch extends Search> = [
  PaginationProps,
  (pagination: PaginationProps) => void,
  SorterResult<T>,
  (sorter: SorterResult<T>) => void,
  (pagination: PaginationProps, filters: Record<string, any>, newSorter: SorterResult<T>) => void,
];

function getSortOrder(sortOrder: SearchOrderType) {
  if (sortOrder === 'asc') {
    return 'ascend';
  }
  return 'descend';
}

export function useMasterTable<T extends Model, TSearch extends Search>(
  search: TSearch,
  setSearch: (search: TSearch) => void,
): UseMasterTableResult<T, TSearch> {
  const [sorter, setSorter] = React.useState<SorterResult<T>>({
    field: search.orderBy,
    order: getSortOrder(search.orderType),
  } as SorterResult<T>);
  const [pagination, setPagination] = React.useState<PaginationProps>({
    current: search.skip / search.take + 1,
    pageSize: search.take,
  } as PaginationProps);

  const handleTableChange = React.useCallback(
    (
      newPagination: PaginationProps,
      filters: Record<string, any>,
      newSorter: SorterResult<T>,
    ) => {
      const {field, order} = sorter;
      if (newSorter.field !== field || newSorter.order !== order) {
        setSorter(newSorter);
        setPagination({
          ...newPagination,
          current: 1,
        });
        setSearch(new Search({
          ...search,
          orderBy: newSorter.order,
          orderType: newSorter.order,
          skip: 0,
        }) as TSearch);
        return;
      }
      const {current, pageSize} = pagination;
      if (newPagination.current !== current || newPagination.pageSize !== pageSize) {
        setPagination({
          ...pagination,
          ...newPagination,
        });
        setSearch(new Search({
          ...search,
          take: newPagination.pageSize || DEFAULT_TAKE,
          skip: (newPagination.current || 1) * ((newPagination.pageSize || DEFAULT_TAKE) - 1),
        }) as TSearch);
        return;
      }
      setSearch(new Search({
        ...search,
        ...filters,
      }) as TSearch);
    },
    [search, setSearch, sorter, pagination],
  );

  return [pagination, setPagination, sorter, setSorter, handleTableChange];
}
