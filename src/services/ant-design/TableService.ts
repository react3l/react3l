import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import {PaginationConfig, PaginationProps} from 'antd/lib/pagination';
import {SorterResult} from 'antd/lib/table';
import {AxiosError} from 'axios';
import {DEFAULT_TAKE} from 'core/config';
import {DateFilter, Filter, GuidFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {translate} from 'core/helpers';
import {Model, Search} from 'core/models';
import {getOrderType, getOrderTypeForTable, setOrderType} from 'helpers/ant-design/table';
import {Moment} from 'moment';
import {useTranslation} from 'react-i18next';
import React from 'reactn';
import nameof from 'ts-nameof.macro';

const DEFAULT_SUCCESS_MESSAGE: string = translate('general.delete.success');
const DEFAULT_FAILURE_MESSAGE: string = translate('general.delete.failure');
const DEFAULT_TITLE_MESSAGE: string = translate('general.delete.title');
const DEFAULT_CONTENT_MESSAGE: string = translate('general.delete.content');

export type FilterHandlerType<TSearch extends Search> = (list: any[], search?: TSearch) => any[];

export class TableService {
  public static hasType(filter: Filter) {
    return Object.keys(filter).length > 0;
  }

  public useDeleteHandler<T extends Model>(
    onDelete: (t: T) => Promise<T>,
    onSetLoading: (loading: boolean) => void,
    model: T,
    setModel: (t: T) => void,
    onSuccess?: (t?: T) => void,
    onError?: (error: Error) => void,
    onCancel?: () => void,
  ) {
    const [translate] = useTranslation();
    return React.useMemo(
      () => {
        return () => {
          Modal.confirm({
            title: translate(DEFAULT_TITLE_MESSAGE, model),
            content: translate(DEFAULT_CONTENT_MESSAGE, model),
            okType: 'danger',
            onOk: () => {
              onSetLoading(true);
              onDelete(model)
                .then(() => {
                  message.info(translate(DEFAULT_SUCCESS_MESSAGE, model));
                  if (typeof onSuccess === 'function') {
                    onSuccess();
                  }
                })
                .catch((error: AxiosError<T>) => {
                  message.error(translate(DEFAULT_FAILURE_MESSAGE, {error, ...model}));
                  setModel(Model.clone<T>({
                    ...model,
                    errors: error.response.data,
                  }));
                  if (typeof onError === 'function') {
                    onError(error);
                  }
                })
                .finally(
                  () => {
                    onSetLoading(false);
                  },
                );
            },
            onCancel,
          });
        };
      },
      // tslint:disable-next-line:max-line-length
      [model, onCancel, onDelete, onError, onSetLoading, onSuccess, setModel, translate],
    );
  }

  public useLocalTable<T extends Model, TSearch extends Search>(
    list: T[],
    search: TSearch,
    setSearch: (search: TSearch) => void,
    filterHandler: FilterHandlerType<TSearch> = this.defaultFilterHandler,
  ): [
    T[],
    PaginationProps,
    SorterResult<TSearch>,
    (newPagination: PaginationConfig, filters: Record<string, any>, newSorter: SorterResult<T>) => void,
    (field: string) => (filter: Filter) => void,
  ] {
    const sorter: SorterResult<TSearch> = React.useMemo(
      () => ({
        field: search.orderBy,
        order: getOrderType(search),
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
            orderType: getOrderTypeForTable<T>(newSorter.field, newSorter),
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

  public useMasterTable<T extends Model, TSearch extends Search>(
    search: TSearch,
    setSearch: (search: TSearch) => void,
    total: number,
  ): [
    PaginationProps,
    SorterResult<T>,
    (pagination: PaginationProps, filters: Record<string, any>, newSorter: SorterResult<T>) => void,
  ] {

    const pagination: PaginationProps = React.useMemo(
      () => ({
        total,
        current: search.skip / search.take + 1,
        pageSize: search.take,
        showSizeChanger: true,
      }),
      [search.skip, search.take, total],
    );

    const sorter: SorterResult<T> = React.useMemo(
      () => ({
        field: search.orderBy,
        order: getOrderType(search),
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
          setOrderType(newSearch, newSorter.order);
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

  public useRowSelection(): [
    any[],
    (selectedRowKeys: any[]) => void,
    boolean,
  ] {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<any[]>([]);

    return [
      selectedRowKeys,
      setSelectedRowKeys,
      selectedRowKeys.length > 0,
    ];
  }

  private defaultFilterHandler<T extends Model, TSearch extends Search>(list: T[], search?: TSearch) {
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
              if (value instanceof Filter && TableService.hasType(value)) {
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
}

export const antTableService: TableService = new TableService();
