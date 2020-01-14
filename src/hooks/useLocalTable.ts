import {PaginationConfig, PaginationProps} from 'antd/lib/pagination';
import {SorterResult} from 'antd/lib/table';
import {DateFilter, Filter, GuidFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Model, Search} from 'core/models';
import {Moment} from 'moment';
import React from 'react';
import nameof from 'ts-nameof.macro';

export type LocalTableHookResult<T extends Model, TSearch extends Search> = [
  T[],
  PaginationProps,
  SorterResult<TSearch>,
  (newPagination: PaginationConfig, filters: Record<string, any>, newSorter: SorterResult<T>) => void,
  (field: string) => (filter: Filter) => void,
];

export type FilterHandlerType<TSearch extends Search> = (list: any[], search?: TSearch) => any[];

function hasType(filter: Filter) {
  return Object.keys(filter).length > 0;
}

function defaultFilterHandler<T extends Model, TSearch extends Search>(list: T[], search?: TSearch) {
  if (search) {
    Object
      .entries(search)
      .forEach(([key, value]) => {
        switch (key) {
          case nameof(search.skip):

            break;

          case nameof(search.take):

            break;

          case nameof(search.orderBy):

            break;

          case nameof(search.orderType):

            break;

          default:
            if (value instanceof Filter && hasType(value)) {
              if (value instanceof StringFilter) {
                Object
                  .entries(value)
                  .forEach(([filterKey, filterValue]) => {
                    switch (filterKey) {
                      case nameof(value.startWith):
                        list = list.filter((t: T) => {
                          return (t[key] as string)?.startsWith(filterValue);
                        });
                        break;

                      case nameof(value.endWith):
                        list = list.filter((t: T) => {
                          return (t[key] as string)?.endsWith(filterValue);
                        });
                        break;

                      case nameof(value.contain):
                        list = list.filter((t: T) => {
                          return (t[key] as string)?.indexOf(filterValue) >= 0;
                        });
                        break;

                      default:
                        // Do nothing
                        break;
                    }
                  });
              } else if (value instanceof NumberFilter) {
                Object
                  .entries(value)
                  .forEach(([filterKey, filterValue]) => {
                    switch (filterKey) {
                      case nameof(value.range):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if (typeof v === 'number') {
                            let result: boolean = true;
                            if (filterValue instanceof Array) {
                              if (typeof filterValue[0] === 'number') {
                                result = result && v >= filterValue[0];
                              }
                              if (typeof filterValue[1] === 'number') {
                                result = result && v <= filterValue[1];
                              }
                            }
                            return result;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.equal):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if (typeof v === 'number' && typeof filterValue === 'number') {
                            return v === filterValue;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.notEqual):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if (typeof v === 'number' && typeof filterValue === 'number') {
                            return v !== filterValue;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.less):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if (typeof v === 'number' && typeof filterValue === 'number') {
                            return v < filterValue;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.greater):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if (typeof v === 'number' && typeof filterValue === 'number') {
                            return v > filterValue;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.lessEqual):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if (typeof v === 'number' && typeof filterValue === 'number') {
                            return v <= filterValue;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.greaterEqual):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if (typeof v === 'number' && typeof filterValue === 'number') {
                            return v >= filterValue;
                          }
                          return true;
                        });
                        break;

                      default:
                        // Do nothing
                        break;
                    }
                  });
              } else if (value instanceof DateFilter) {
                Object
                  .entries(value)
                  .forEach(([filterKey, filterValue]) => {
                    switch (filterKey) {
                      case nameof(value.range):
                        list = list.filter((t: T) => {
                          const v: number = (t[key] as Moment)?.toDate().getTime();
                          if (typeof v === 'number') {
                            const [minValue, maxValue] = (filterValue ?? []) as [Moment, Moment];
                            let result: boolean = true;
                            if (minValue !== null && typeof minValue === 'object') {
                              const minTimeValue: number = minValue.toDate().getTime();
                              result = result && minTimeValue <= v;
                            }
                            if (maxValue !== null && typeof maxValue === 'object') {
                              const maxTimeValue: number = maxValue.toDate().getTime();
                              result = result && maxTimeValue >= v;
                            }
                            return result;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.equal):
                        list = list.filter((t: T) => {
                          const v: number = (t[key] as Moment)?.toDate().getTime();
                          if (typeof v === 'number' && typeof filterValue === 'object' && filterValue !== null) {
                            const comparisonValue: number = (filterValue as Moment)?.toDate().getTime();
                            if (typeof comparisonValue === 'number') {
                              return v === comparisonValue;
                            }
                            return true;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.notEqual):
                        list = list.filter((t: T) => {
                          const v: number = (t[key] as Moment)?.toDate().getTime();
                          if (typeof v === 'number' && typeof filterValue === 'object' && filterValue !== null) {
                            const comparisonValue: number = (filterValue as Moment)?.toDate().getTime();
                            if (typeof comparisonValue === 'number') {
                              return v !== comparisonValue;
                            }
                            return true;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.less):
                        list = list.filter((t: T) => {
                          const v: number = (t[key] as Moment)?.toDate().getTime();
                          if (typeof v === 'number' && typeof filterValue === 'object' && filterValue !== null) {
                            const comparisonValue: number = (filterValue as Moment)?.toDate().getTime();
                            if (typeof comparisonValue === 'number') {
                              return v < comparisonValue;
                            }
                            return true;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.greater):
                        list = list.filter((t: T) => {
                          const v: number = (t[key] as Moment)?.toDate().getTime();
                          if (typeof v === 'number' && typeof filterValue === 'object' && filterValue !== null) {
                            const comparisonValue: number = (filterValue as Moment)?.toDate().getTime();
                            if (typeof comparisonValue === 'number') {
                              return v > comparisonValue;
                            }
                            return true;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.lessEqual):
                        list = list.filter((t: T) => {
                          const v: number = (t[key] as Moment)?.toDate().getTime();
                          if (typeof v === 'number' && typeof filterValue === 'object' && filterValue !== null) {
                            const comparisonValue: number = (filterValue as Moment)?.toDate().getTime();
                            if (typeof comparisonValue === 'number') {
                              return v <= comparisonValue;
                            }
                            return true;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.greaterEqual):
                        list = list.filter((t: T) => {
                          const v: number = (t[key] as Moment)?.toDate().getTime();
                          if (typeof v === 'number' && typeof filterValue === 'object' && filterValue !== null) {
                            const comparisonValue: number = (filterValue as Moment)?.toDate().getTime();
                            if (typeof comparisonValue === 'number') {
                              return v >= comparisonValue;
                            }
                            return true;
                          }
                          return true;
                        });
                        break;

                      default:
                        // Do nothing
                        break;
                    }
                  });
              } else if (value instanceof IdFilter || value instanceof GuidFilter) {
                Object
                  .entries(value)
                  .forEach(([filterKey, filterValue]) => {
                    switch (filterKey) {
                      case nameof(value.equal):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if ((typeof v === 'number' || typeof value === 'string') && (typeof filterValue === 'number' || typeof filterValue === 'string')) {
                            return v === filterValue;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.notEqual):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if ((typeof v === 'number' || typeof value === 'string') && (typeof filterValue === 'number' || typeof filterValue === 'string')) {
                            return v !== filterValue;
                          }
                          return true;
                        });
                        break;

                      case nameof(value.in):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if ((typeof v === 'number' || typeof value === 'string') && (filterValue instanceof Array)) {
                            return filterValue.includes(v);
                          }
                          return true;
                        });
                        break;

                      case nameof(value.notIn):
                        list = list.filter((t: T) => {
                          const v: number = t[key] as number;
                          if ((typeof v === 'number' || typeof value === 'string') && (filterValue instanceof Array)) {
                            return !filterValue.includes(v);
                          }
                          return true;
                        });
                        break;

                      default:
                        // Do nothing
                        break;
                    }
                  });
              }
            }
            break;
        }
      });
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
