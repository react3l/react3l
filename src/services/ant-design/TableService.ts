import React from 'reactn';
import {PaginationProps} from 'antd/lib/pagination';
import {Model, ModelFilter} from 'core/models';
import {SorterResult, TableRowSelection} from 'antd/lib/table';
import {getOrderType, setOrderType} from 'helpers/ant-design/table';
import {DEFAULT_TAKE} from 'core/config';
import {Dispatch, SetStateAction} from 'react';
import {AxiosError} from 'axios';
import {Modal} from 'antd';
import {translate} from 'core/helpers/internationalization';
import {generalLanguageKeys} from 'config/consts';
import {BatchId} from 'react3l';

export class TableService {
  public useRowSelection<T extends Model>(): [
    TableRowSelection<T>,
    boolean,
  ] {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[] | number[]>([]);

    const rowSelection: TableRowSelection<T> = React.useMemo(
      () => ({
        onChange: setSelectedRowKeys,
        selectedRowKeys,
      }),
      [selectedRowKeys],
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
    (pagination: PaginationProps, filters: Record<string, any>, newSorter: SorterResult<T>) => void,
  ] {

    const pagination: PaginationProps = React.useMemo(() => {
      const {
        take,
        skip,
      } = filter;

      return {
        total, current: skip / take + 1, pageSize: take, showSizeChanger: true,
      };
    }, [filter, total]);

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
            ...filter, take: pageSize, skip: (current - 1) * pageSize,
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

  public useBatchDeleteHandler(
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
}

export const tableService: TableService = new TableService();
