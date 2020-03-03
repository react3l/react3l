import React from 'reactn';
import {PaginationConfig, PaginationProps} from 'antd/lib/pagination';
import {Model, ModelFilter} from 'core/models';
import {SorterResult, TableRowSelection} from 'antd/lib/table';
import {getOrderType, getOrderTypeForTable, setOrderType} from 'helpers/ant-design/table';
import {DEFAULT_TAKE} from 'core/config';
import {Dispatch, SetStateAction} from 'react';
import {AxiosError} from 'axios';
import {Modal} from 'antd';
import {translate} from 'core/helpers/internationalization';
import {generalLanguageKeys} from 'config/consts';
import {BatchId, FilterHandlerType} from 'react3l';
import {Moment} from 'moment';
import {DateFilter, Filter, GuidFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import nameof from 'ts-nameof.macro';

const crudDefaultSelectedRowKeys: string[] | number[] = [];

export class TableService {
  public useRowSelection<T extends Model>(
    defaultSelectedRowKeys: string[] | number[] = crudDefaultSelectedRowKeys,
    onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => void,
  ): [
    TableRowSelection<T>,
    boolean,
  ] {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[] | number[]>(defaultSelectedRowKeys);

    const handleChange = React.useCallback(
      (selectedRowKeys: string[] | number[], selectedRows: T[]) => {
        setSelectedRowKeys(selectedRowKeys);
        if (typeof onChange === 'function') {
          onChange(selectedRowKeys, selectedRows);
        }
      },
      [onChange],
    );

    const rowSelection: TableRowSelection<T> = React.useMemo(
      () => ({
        onChange: handleChange,
        selectedRowKeys,
      }),
      [handleChange, selectedRowKeys],
    );

    return [rowSelection, selectedRowKeys.length > 0];
  }

  public useMasterTable<T extends Model, TFilter extends ModelFilter>(
    filter: TFilter,
    setFilter: Dispatch<SetStateAction<TFilter>>,
    total: number,
  ): [
    PaginationProps,
    SorterResult<T>,
    (pagination: PaginationProps,
     filters: Record<string, any>,
     newSorter: SorterResult<T>) => void,
  ] {

    const pagination: PaginationProps = React.useMemo(() => {
        const {
          take,
          skip,
        } = filter;

        return {
          total,
          current: skip / take + 1,
          pageSize: take,
          showSizeChanger: true,
        };
      },
      [filter, total],
    );

    const sorter: SorterResult<T> = React.useMemo(
      () => ({
        field: filter.orderBy,
        order: getOrderType(filter),
      } as SorterResult<T>),
      [filter],
    );

    const handleTableChange = React.useCallback(
      (newPagination: PaginationProps, filters: Record<string, any>, newSorter: SorterResult<T>) => {
        const {field, order} = sorter;
        if (newSorter.field !== field || newSorter.order !== order) {
          const newFilter: TFilter = ModelFilter.clone<TFilter>({
            ...filter, orderBy: newSorter.field, skip: 0,
          });
          setOrderType(newFilter, newSorter.order);
          setFilter(newFilter);
          return;
        }
        const {
          current = 1, pageSize = DEFAULT_TAKE, total = 0,
        } = newPagination;
        if (pagination.current !== current || pagination.pageSize !== pageSize || pagination.total !== total) {
          setFilter(ModelFilter.clone<TFilter>({
            ...filter,
            take: pageSize,
            skip: (current - 1) * pageSize,
          }));
          return;
        }
        setFilter(ModelFilter.clone<TFilter>({
          ...filter, ...filters,
        }));
      },
      [pagination, filter, setFilter, sorter],
    );
    return [pagination, sorter, handleTableChange];
  }

  public useDeleteHandler<T extends Model>(
    onDelete: (t: T) => Promise<T>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    list?: T[],
    setList?: Dispatch<SetStateAction<T[]>>,
    setT?: Dispatch<SetStateAction<T>>,
    onSuccess?: () => void,
    onError?: (error: AxiosError<T> | Error) => void,
    onCancel?: () => void,
  ): [
    (t: T) => () => void,
  ] {
    return [
      React.useCallback(
        (t: T) => {
          return () => {
            Modal.confirm({
              title: translate(generalLanguageKeys.delete.title),
              content: translate(generalLanguageKeys.delete.content),
              onCancel,
              okType: 'danger',
              onOk() {
                setLoading(true);
                onDelete(t)
                  .then(onSuccess)
                  .catch((error: AxiosError<T> | Error) => {
                    if (typeof onError === 'function') {
                      onError(error);
                      return;
                    }
                    if ('response' in error) {
                      if (typeof list === 'object' && list instanceof Array && typeof setList === 'function') {
                        setList(list.map((listItem: T) => {
                          if (listItem.id === t.id) {
                            listItem.errors = error.response?.data;
                          }
                          return listItem;
                        }));
                        return;
                      }
                      if (typeof t === 'object' && t !== null && typeof setT === 'function') {
                        t.errors = error.response?.data;
                        setT(Model.clone<T>(t));
                        return;
                      }
                    }
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              },
            });
          };
        },
        [list, onCancel, onDelete, onError, onSuccess, setList, setLoading, setT],
      ),
    ];
  }

  public useBulkDeleteHandler(
    selectedRowKeys: number[] | string[],
    onDelete: (idList: BatchId) => Promise<void>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    onSuccess?: () => void,
    onError?: (error: AxiosError<any> | Error) => void,
    onCancel?: () => void,
  ): [
    () => void,
  ] {
    return [
      React.useCallback(
        () => {
          Modal.confirm({
            title: translate(generalLanguageKeys.batchDelete.title),
            content: translate(generalLanguageKeys.batchDelete.content),
            onCancel,
            okType: 'danger',
            onOk() {
              setLoading(true);
              onDelete({
                ids: selectedRowKeys,
              })
                .then(onSuccess)
                .catch(onError)
                .finally(() => {
                  setLoading(false);
                });
            },
          });
        },
        [onCancel, onDelete, onError, onSuccess, selectedRowKeys, setLoading],
      ),
    ];
  }

  public useLocalTable<T extends Model, TModelFilter extends ModelFilter>(
    list: T[],
    search: TModelFilter,
    setModelFilter: (search: TModelFilter) => void,
    filterHandler: FilterHandlerType<TModelFilter> = this.defaultFilterHandler): [
    T[],
    PaginationProps,
    SorterResult<TModelFilter>,
    (
      newPagination: PaginationConfig,
      filters: Record<string, any>,
      newSorter: SorterResult<T>,
    ) => void,
    (field: string) => (filter: Filter) => void,
    () => void,
    () => void,
  ] {
    const sorter: SorterResult<TModelFilter> = React.useMemo(() => ({
      field: search.orderBy, order: getOrderType(search), columnKey: search.orderBy, column: undefined,
    }), [search]);

    const dataSource: T[] = React.useMemo(() => {
      return filterHandler(list, search);
    }, [filterHandler, list, search]);

    const handleSearch = React.useCallback(
      () => {
        setModelFilter(ModelFilter.clone<TModelFilter>(search));
      },
      [search, setModelFilter],
    );

    const handleReset = React.useCallback(() => {
      const newModelFilter: TModelFilter = ModelFilter.clone<TModelFilter>(search);
      Object
        .entries(newModelFilter)
        .forEach(([key, value]) => {
          switch (key) {
            case nameof(newModelFilter.skip):
              newModelFilter.skip = 0;
              break;

            case nameof(newModelFilter.take):
              newModelFilter.take = DEFAULT_TAKE;
              break;

            case nameof(newModelFilter.orderBy):
              newModelFilter.orderBy = undefined;
              break;

            case nameof(newModelFilter.orderType):
              newModelFilter.orderBy = undefined;
              break;

            default:
              if (typeof value === 'object' && value !== null) {
                Object
                  .entries(value)
                  .forEach(([filterKey]) => {
                    value[filterKey] = undefined;
                  });
                newModelFilter[key] = {...value};
              }
              break;
          }
        });
      setModelFilter(newModelFilter);
    }, [search, setModelFilter]);

    const pagination: PaginationProps = React.useMemo(() => {
      const {
        skip, take,
      } = search;

      const {length} = dataSource ?? [];

      return {
        current: (skip / take) + 1, pageSize: take, total: length,
      };
    }, [dataSource, search]);

    const handleTableChange = React.useCallback(
      (newPagination: PaginationConfig, filters: Record<string, any>, newSorter: SorterResult<T>) => {
        const {pageSize: take} = newPagination;
        const skip: number = (newPagination.current - 1) * newPagination.pageSize;

        if (skip !== search.skip || take !== search.take) {
          setModelFilter(ModelFilter.clone<TModelFilter>({
            ...search, skip, take,
          }));
          return;
        }

        const {field, order} = sorter;

        if (newSorter.field !== field || newSorter.order !== order) {
          setModelFilter(ModelFilter.clone<TModelFilter>({
            ...search, orderBy: newSorter.field, orderType: getOrderTypeForTable<T>(newSorter.field, newSorter),
          }));
          return;
        }

        setModelFilter(ModelFilter.clone<TModelFilter>({
          ...search, ...filters,
        }));
      }, [search, setModelFilter, sorter]);

    const handleFilter = React.useCallback((field: string) => {
        return (filter: Filter) => {
          setModelFilter(ModelFilter.clone<TModelFilter>({
            ...search, [field]: filter,
          }));
        };
      },
      [search, setModelFilter],
    );

    return [dataSource, pagination, sorter, handleTableChange, handleFilter, handleSearch, handleReset];
  }

  private defaultFilterHandler<T extends Model, TSearch extends ModelFilter>(list: T[], search?: TSearch) {
    if (typeof search === 'object' && search !== null) {
      Object
        .entries<StringFilter | DateFilter | NumberFilter | IdFilter | GuidFilter>(search as any)
        .forEach(([key, value]) => {
          switch (key) {
            case nameof(search.skip):
              // Do nothing
              break;

            case nameof(search.take):
              // Do nothing
              break;

            case nameof(search.orderBy):
              // Do nothing
              break;

            case nameof(search.orderType):
              // Do nothing
              break;

            default:
              if (value instanceof StringFilter) {
                Object
                  .entries(value)
                  .forEach(([filterKey, filterValue]) => {
                    if (typeof filterValue === 'string' && filterValue !== '') {
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
                    }
                  });
                break;
              }
              if (value instanceof NumberFilter) {
                Object
                  .entries(value)
                  .forEach(([filterKey, filterValue]) => {
                    if (filterKey === nameof(value.range)) {
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
                    } else {
                      if (typeof filterValue === 'number' && !Number.isNaN(filterValue)) {
                        switch (filterKey) {
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
                      }
                    }
                  });
                break;
              }
              if (value instanceof DateFilter) {
                Object
                  .entries(value)
                  .forEach(([filterKey, filterValue]) => {
                    if (filterKey === nameof(value.range)) {
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
                    } else {
                      switch (filterKey) {
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
                    }
                  });
                break;
              }
              if (value instanceof IdFilter || value instanceof GuidFilter) {
                Object
                  .entries(value)
                  .forEach(([filterKey, filterValue]) => {
                    if ((typeof filterValue === 'string' && filterValue !== '') || (typeof filterValue === 'number' && !Number.isNaN(filterValue))) {
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
                            if ((typeof v === 'number' || typeof value === 'string') && (filterValue as any instanceof Array)) {
                              return (filterValue as any).includes(v);
                            }
                            return true;
                          });
                          break;

                        case nameof(value.notIn):
                          list = list.filter((t: T) => {
                            const v: number = t[key] as number;
                            if ((typeof v === 'number' || typeof value === 'string') && (filterValue as any instanceof Array)) {
                              return !(filterValue as any).includes(v);
                            }
                            return true;
                          });
                          break;

                        default:
                          // Do nothing
                          break;
                      }
                    }
                  });
                break;
              }
          }
        });
      return list;
    }
    return list;
  }
}

export const tableService: TableService = new TableService();
