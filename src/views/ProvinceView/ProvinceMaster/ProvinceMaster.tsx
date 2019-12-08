import Table, {ColumnProps} from 'antd/lib/table';
import {useMaster} from 'core/hooks';
import {useMasterTable} from 'hooks/useMasterTable';
import {Province} from 'models/Province';
import {ProvinceSearch} from 'models/ProvinceSearch';
import React from 'react';
import {useTranslation} from 'react-i18next';
import './ProvinceMaster.scss';
import provinceMasterRepository from './ProvinceMasterRepository';

function ProvinceMaster() {
  const [translate] = useTranslation();

  const [
    list,
    ,
    search,
    setSearch,
    loading,
  ] = useMaster<Province, ProvinceSearch>(provinceMasterRepository.list);

  const [
    pagination,
    ,
    ,
    ,
    handleTableChange,
  ] = useMasterTable<Province, ProvinceSearch>(search, setSearch);

  const columns: Array<ColumnProps<Province>> = React.useMemo(
    () => [
      {
        title: translate('province.id'),
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: translate('province.name'),
        dataIndex: 'name',
        key: 'name',
      },
    ],
    [translate],
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
