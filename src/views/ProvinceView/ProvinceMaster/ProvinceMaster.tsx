import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Table, {ColumnProps} from 'antd/lib/table';
import MasterTableActions from 'components/MasterTableActions/MasterTableActions';
import MasterTableFilter, {MasterTableObjectFilter} from 'components/MasterTableFilter/MasterTableFilter';
import {MASTER_KEYS} from 'config/consts';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {useDeleteHandler, useMaster} from 'core/hooks';
import {useEnumList} from 'core/hooks/useEnumList';
import {useMasterTable} from 'core/hooks/useMasterTable';
import {withTableFilterSuffix} from 'helpers/string';
import {renderMasterIndex} from 'helpers/view';
import {Province} from 'models/Province';
import {ProvinceSearch} from 'models/ProvinceSearch';
import {ProvinceType} from 'models/ProvinceType';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import './ProvinceMaster.scss';
import repository from './ProvinceMasterRepository';

function ProvinceMaster() {
  const [translate] = useTranslation();

  const [provinceTypes] = useEnumList<ProvinceType>(repository.listProvinceType);

  // tslint:disable-next-line:max-line-length
  const [list, total, search, setSearch, loading, setLoading, handleAdd, handleReset, handleEdit, handleFilter, handleObjectFilter] = useMaster<Province, ProvinceSearch>(PROVINCE_ROUTE, repository.list, repository.count);

  const [pagination, sorter, handleTableChange] = useMasterTable<Province, ProvinceSearch>(search, setSearch, total);

  const handleDelete = useDeleteHandler<Province>(repository.delete, setLoading);

  const columns: Array<ColumnProps<Province>> = React.useMemo(
    () => {
      const {
        id,
        name,
        provinceType,
        provinceTypeId,
      } = search;
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
          sortOrder: ProvinceSearch.getOrderTypeForTable<ProvinceSearch>(nameof(list[0].id), sorter),
          children: [
            {
              title: (
                <MasterTableFilter name={nameof(list[0].id)}
                                   defaultValue={id}
                                   onChange={handleFilter(nameof(id))}/>
              ),
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
          sortOrder: ProvinceSearch.getOrderTypeForTable<ProvinceSearch>(nameof(list[0].name), sorter),
          children: [
            {
              title: (
                <MasterTableFilter name={nameof(list[0].name)}
                                   defaultValue={name}
                                   onChange={handleFilter(nameof(name))}/>
              ),
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
          sortOrder: ProvinceSearch.getOrderTypeForTable<ProvinceSearch>(nameof(list[0].provinceType), sorter),
          children: [
            {
              title: (
                <MasterTableObjectFilter list={provinceTypes}
                                         value={provinceTypeId}
                                         onChange={handleObjectFilter(nameof(provinceType))}
                />
              ),
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
          fixed: 'right',
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.actions)),
              dataIndex: nameof(list[0].id),
              className: 'filter-placeholder',
              fixed: 'right',
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
    [handleDelete, handleEdit, handleFilter, handleObjectFilter, list, pagination, provinceTypes, search, sorter, translate],
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
