import {PaginationConfig, PaginationProps} from 'antd/lib/pagination';
import {SorterResult} from 'antd/lib/table';
import {Filter} from 'core/filters';
import {Model, Search} from 'core/models';
import React from 'react';

export type LocalTableHookResult<T extends Model, TSearch extends Search> = [
  T[],
  PaginationProps,
  SorterResult<TSearch>,
  (newPagination: PaginationConfig, filters: Record<string, any>, newSorter: SorterResult<T>) => void,
  (field: string) => (filter: Filter) => void,
];

export type FilterHandlerType<TSearch extends Search> = (list: any[], search?: TSearch) => any[];

function defaultFilterHandler<TSearch extends Search>(list: any[], search?: TSearch) {
  if (search) {
    return list;
  }
  return list;
}

export function useLocalTable<T extends Model, TSearch extends Search>(
  list: T[],
  search: TSearch,
  setSearch: (search: TSearch) => void,
  filterHandler: FilterHandlerType<TSearch> = defaultFilterHandler,
): LocalTableHookResult<T, TSearch> {
  const sorter: SorterResult<TSearch> = React.useMemo(
    () => ({
      field: search.orderBy,
      order: Search.getOrderType(search),
      columnKey: search.orderBy,
      column: undefined,
    }),
    [search],
  );

  const dataSource: T[] = React.useMemo(
    () => {
      return filterHandler(list, search);
    },
    [filterHandler, list, search],
  );

  const pagination: PaginationProps = React.useMemo(
    () => {
      const {
        skip,
        take,
      } = search;

      const {length} = dataSource ?? [];

      return {
        current: (skip / take) + 1,
        pageSize: take,
        total: length,
      };
    },
    [dataSource, search],
  );

  const handleTableChange = React.useCallback(
    (
      newPagination: PaginationConfig,
      filters: Record<string, any>,
      newSorter: SorterResult<T>,
    ) => {
      const {pageSize: take} = newPagination;
      const skip: number = (newPagination.current - 1) * newPagination.pageSize;

      if (skip !== search.skip ?? take !== search.take) {
        setSearch(Search.clone<TSearch>({
          ...search,
          skip,
          take,
        }));
        return;
      }

      const {field, order} = sorter;

      if (newSorter.field !== field ?? newSorter.order !== order) {
        setSearch(Search.clone<TSearch>({
          ...search,
          orderBy: newSorter.field,
          orderType: Search.getOrderTypeForTable<T>(newSorter.field, newSorter),
        }));
        return;
      }

      setSearch(Search.clone<TSearch>({
        ...search,
        ...filters,
      }));
    },
    [search, setSearch, sorter],
  );

  const handleFilter = React.useCallback(
    (field: string) => {
      return (filter: Filter) => {
        setSearch(Search.clone<TSearch>({
          ...search,
          [field]: filter,
        }));
      };
    },
    [search, setSearch],
  );

  return [dataSource, pagination, sorter, handleTableChange, handleFilter];
}
