import {PaginationProps} from 'antd/lib/pagination';
import {SorterResult} from 'antd/lib/table';
import {PrimitiveValue, useFilter} from 'core/hooks/useFilter';
import {Model, Search} from 'core/models';
import React, {ChangeEvent} from 'react';

type LocalTableResult<T extends Model, TSearch extends Search> = [
  T[],
  PaginationProps,
  TSearch,
  SorterResult<TSearch>,
  (newPagination: PaginationProps, filters: Record<string, any>, newSorter: SorterResult<TSearch>) => void,
  (field: string) => (event?: ChangeEvent | PrimitiveValue | PrimitiveValue[]) => void,
  (field: string) => (value?: number, model?: T) => void,
];

export type FilterHandlerType<TSearch extends Search> = (list: any[], search: TSearch) => any[];

function defaultFilterHandler(list: any[]) {
  return list;
}

export function useLocalTable<T extends Model, TSearch extends Search>(
  list: T[],
  filterHandler: FilterHandlerType<TSearch> = defaultFilterHandler,
): LocalTableResult<T, TSearch> {
  const [search, setSearch] = React.useState<TSearch>(new Search() as TSearch);

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

      const {length} = dataSource || [];

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
      newPagination: PaginationProps,
      filters: Record<string, any>,
      newSorter: SorterResult<TSearch>,
    ) => {
      const {pageSize: take} = newPagination;
      const skip: number = (newPagination.current - 1) * newPagination.pageSize;

      if (skip !== search.skip || take !== search.take) {
        setSearch(Search.clone<TSearch>({
          ...search,
          skip,
          take,
        }));
        return;
      }

      const {field, order} = sorter;

      if (newSorter.field !== field || newSorter.order !== order) {
        setSearch(Search.clone<TSearch>({
          ...search,
          orderBy: newSorter.field,
          orderType: Search.getOrderTypeForTable<TSearch>(newSorter.field, newSorter),
        }));
        return;
      }

      setSearch(Search.clone<TSearch>({
        ...search,
        ...filters,
      }));
    },
    [search, sorter],
  );

  const [handleFilter, handleObjectFilter] = useFilter<T, TSearch>(search, setSearch);

  return [dataSource, pagination, search, sorter, handleTableChange, handleFilter, handleObjectFilter];
}
