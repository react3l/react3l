import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Table, {ColumnProps} from 'antd/lib/table';
import MasterTableActions from 'components/MasterTableActions/MasterTableActions';
import {MASTER_KEYS} from 'config/consts';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {withTableFilterSuffix} from 'core/helpers/string';
import {renderMasterIndex} from 'core/helpers/view';
import {useDeleteHandler, useMaster} from 'core/hooks';
import {useMasterTable} from 'core/hooks/useMasterTable';
import {Province} from 'models/Province';
import {ProvinceSearch} from 'models/ProvinceSearch';
import {ProvinceType} from 'models/ProvinceType';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import repository from 'views/ProvinceView/ProvinceRepository';
import './ProvinceMaster.scss';

function ProvinceMaster() {
  const [translate] = useTranslation();

  // tslint:disable-next-line:max-line-length
  const [list, total, search, setSearch, loading, setLoading, handleAdd, handleReset, handleEdit] = useMaster<Province, ProvinceSearch>(PROVINCE_ROUTE, repository.list, repository.count);

  const [pagination, sorter, handleTableChange] = useMasterTable<Province, ProvinceSearch>(search, setSearch, total);

  const handleDelete = useDeleteHandler<Province, ProvinceSearch>(repository.delete, setLoading, search, setSearch);

  const columns: Array<ColumnProps<Province>> = React.useMemo(
    () => {
      return [
        {
          title: translate(MASTER_KEYS.index),
          key: nameof(MASTER_KEYS.index),
          dataIndex: nameof(list[0].id),
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.index)),
              dataIndex: nameof(list[0].id),
              render: renderMasterIndex<Province>(pagination),
            },
          ],
        },
        {
          title: translate('province.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: ProvinceSearch.getOrderTypeForTable<Province>(nameof(list[0].id), sorter),
          children: [
            {
              key: withTableFilterSuffix(nameof(list[0].id)),
              dataIndex: nameof(list[0].id),
            },
          ],
        },
        {
          title: translate('province.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: ProvinceSearch.getOrderTypeForTable<Province>(nameof(list[0].name), sorter),
          children: [
            {
              key: withTableFilterSuffix(nameof(list[0].name)),
              dataIndex: nameof(list[0].name),
            },
          ],
        },
        {
          title: translate('province.provinceType'),
          key: nameof(list[0].provinceType),
          dataIndex: nameof(list[0].provinceType),
          sorter: true,
          sortOrder: ProvinceSearch.getOrderTypeForTable<Province>(nameof(list[0].provinceType), sorter),
          children: [
            {
              key: withTableFilterSuffix(nameof(list[0].provinceType)),
              dataIndex: nameof(list[0].provinceType),
              render(type: ProvinceType) {
                return type?.name;
              },
            },
          ],
        },
        {
          title: translate(MASTER_KEYS.actions),
          key: nameof(MASTER_KEYS.actions),
          className: 'actions',
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.actions)),
              dataIndex: nameof(list[0].id),
              className: 'actions filter-placeholder',
              render: (id: number, province: Province) => {
                return (
                  <MasterTableActions onEdit={handleEdit}
                                      onDelete={handleDelete}
                                      model={province}
                                      id={id}
                  />
                );
              },
            },
          ],
        },
      ];
    },
    // tslint:disable-next-line:max-line-length
    [handleDelete, handleEdit, list, pagination, sorter, translate],
  );

  return (
    <Card title={translate('province.master.title')}>
      <Table
        className="master-table province-master-table"
        rowKey="id"
        size="small"
        bordered
        pagination={pagination}
        columns={columns}
        dataSource={list}
        loading={loading}
        onChange={handleTableChange}
        title={() => (
          <div className="table-actions">
            <Button htmlType="button" type="primary" icon="plus" onClick={handleAdd}>
              {translate('general.actions.add')}
            </Button>
            <Button htmlType="button" type="default" icon="filter" onClick={handleReset}>
              {translate('general.actions.reset')}
            </Button>
          </div>
        )}
      />
    </Card>
  );
}

export default ProvinceMaster;
