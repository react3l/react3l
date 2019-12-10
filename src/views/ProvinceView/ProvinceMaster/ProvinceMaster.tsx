import Table, {ColumnProps} from 'antd/lib/table';
import {useMaster} from 'core/hooks';
import {renderMasterIndex} from 'helpers/view';
import {useMasterTable} from 'hooks/useMasterTable';
import {Province} from 'models/Province';
import {ProvinceSearch} from 'models/ProvinceSearch';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameOf from 'ts-nameof.macro';
import './ProvinceMaster.scss';
import repository from './ProvinceMasterRepository';

const model: Province = new Province();

function ProvinceMaster() {
  const [translate] = useTranslation();

  const [
    list,
    total,
    search,
    setSearch,
    loading,
  ] = useMaster<Province, ProvinceSearch>(repository.list, repository.count);

  const [
    pagination,
    sorter,
    handleTableChange,
  ] = useMasterTable<Province, ProvinceSearch>(search, setSearch, total);

  const columns: Array<ColumnProps<Province>> = React.useMemo(
    () => {
      return [
        {
          title: translate('general.master.index'),
          dataIndex: nameOf(model.id),
          key: 'index',
          render: renderMasterIndex<Province>(pagination),
        },
        {
          title: translate('province.id'),
          dataIndex: nameOf(model.id),
          key: nameOf(model.id),
          sorter: true,
          sortOrder: ProvinceSearch.getOrderTypeForTable<ProvinceSearch>(nameOf(model.id), sorter),
        },
        {
          title: translate('province.name'),
          dataIndex: nameOf(model.name),
          key: nameOf(model.name),
          sorter: true,
          sortOrder: ProvinceSearch.getOrderTypeForTable<ProvinceSearch>(nameOf(model.name), sorter),
        },
        {
          title: translate('general.master.actions'),
          dataIndex: nameOf(model.id),
          key: 'actions',
        },
      ];
    },
    [translate, sorter, pagination],
  );

  return (
    <Table
      rowKey="id"
      pagination={pagination}
      columns={columns}
      dataSource={list}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}

export default ProvinceMaster;
