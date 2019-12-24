import {PaginationProps} from 'antd/lib/pagination';
import {SorterResult} from 'antd/lib/table';
import {DEFAULT_TAKE} from 'core/config';
import {Model, Search} from 'core/models';
import React from 'react';

export type UseMasterTableResult<T extends Model> = [
  PaginationProps,
  SorterResult<T>,
  (pagination: PaginationProps, filters: Record<string, any>, newSorter: SorterResult<T>) => void,
];

export function useMasterTable<T extends Model, TSearch extends Search>(
  search: TSearch,
  setSearch: (search: TSearch) => void,
  total: number,
): UseMasterTableResult<T> {

  const pagination: PaginationProps = React.useMemo(
    () => ({
      total,
      current: search.skip / search.take + 1,
      pageSize: search.take,
    }),
    [search.skip, search.take, total],
  );

  const sorter: SorterResult<T> = React.useMemo(
    () => ({
      field: search.orderBy,
      order: Search.getOrderType(search),
    } as SorterResult<T>),
    [search],
  );

  const handleTableChange = React.useCallback(
    (
      newPagination: PaginationProps,
      filters: Record<string, any>,
      newSorter: SorterResult<T>,
    ) => {
      const {field, order} = sorter;
      if (newSorter.field !== field || newSorter.order !== order) {
        const newSearch: TSearch = Search.clone<TSearch>({
          ...search,
          orderBy: newSorter.field,
          skip: 0,
        });
        Search.setOrderType(newSearch, newSorter.order);
        setSearch(newSearch);
        return;
      }
      const {
        current = 1,
        pageSize = DEFAULT_TAKE,
        total = 0,
      } = newPagination;
      if (pagination.current !== current || pagination.pageSize !== pageSize || pagination.total !== total) {
        setSearch(Search.clone<TSearch>({
          ...search,
          take: pageSize,
          skip: (current - 1) * pageSize,
        }));
        return;
      }
      setSearch(Search.clone<TSearch>({
        ...search,
        ...filters,
      }));
    },
    [pagination, search, setSearch, sorter],
  );
  return [pagination, sorter, handleTableChange];
}
