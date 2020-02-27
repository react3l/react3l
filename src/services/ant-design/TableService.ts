import React from 'reactn';
import {PaginationProps} from 'antd/lib/pagination';
import {Model, ModelFilter} from 'core/models';
import {SorterResult, TableRowSelection} from 'antd/lib/table';
import {getOrderType, setOrderType} from 'helpers/ant-design/table';
import {DEFAULT_TAKE} from 'core/config';
import {Dispatch, SetStateAction} from 'react';

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
}

export const tableService: TableService = new TableService();
