import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Table, {ColumnProps} from 'antd/lib/table';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {useMaster} from 'core/hooks';
import {withTableFilterSuffix} from 'helpers/string';
import {renderMasterIndex} from 'helpers/view';
import {useMasterTable} from 'hooks/useMasterTable';
import {Province} from 'models/Province';
import {ProvinceSearch} from 'models/ProvinceSearch';
import {join} from 'path';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router';
import nameof from 'ts-nameof.macro';
import './ProvinceMaster.scss';
import repository from './ProvinceMasterRepository';

const model: Province = new Province();

function ProvinceMaster() {
  const [translate] = useTranslation();
  const history = useHistory();

  const [
    list,
    total,
    search,
    setSearch,
    loading,
    setLoading,
  ] = useMaster<Province, ProvinceSearch>(repository.list, repository.count);

  const [
    pagination,
    sorter,
    handleTableChange,
  ] = useMasterTable<Province, ProvinceSearch>(search, setSearch, total);

  const handleEdit = React.useCallback(
    (id: number) => {
      return () => {
        history.push(join(PROVINCE_ROUTE, id.toString()));
      };
    },
    [history],
  );

  const handleDelete = React.useCallback(
    (province: Province) => {
      return () => {
        Modal.confirm({
          title: translate('province.delete.title', province),
          content: translate('province.delete.content', province),
          onOk: async () => {
            setLoading(true);
            repository.delete(province)
              .then(() => {
                message.info({
                  content: translate('province.delete.success', province),
                });
              })
              .catch(() => {
                message.error(translate('province.delete.failure', province));
              })
              .finally(() => {
                setLoading(false);
              });
          },
          onCancel: () => {
            // Implement action handler here
          },
        });
      };
    },
    [translate, setLoading],
  );

  const handleAdd = React.useCallback(
    () => {
      history.push(join(PROVINCE_ROUTE, 'add'));
    },
    [history],
  );

  const handleReset = React.useCallback(
    () => {
      setSearch(new ProvinceSearch());
    },
    [setSearch],
  );

  const columns: Array<ColumnProps<Province>> = React.useMemo(
    () => {
      return [
        {
          title: translate('general.master.index'),
          key: 'index',
          dataIndex: nameof(model.id),
          children: [
            {
              key: withTableFilterSuffix('index'),
              dataIndex: nameof(model.id),
              render: renderMasterIndex<Province>(pagination),
            },
          ],
        },
        {
          title: translate('province.id'),
          key: nameof(model.id),
          dataIndex: nameof(model.id),
          sorter: true,
          sortOrder: ProvinceSearch.getOrderTypeForTable<ProvinceSearch>(nameof(model.id), sorter),
          children: [
            {
              title: (
                <Input name={nameof(model.id)}/>
              ),
              key: withTableFilterSuffix(nameof(model.id)),
              dataIndex: nameof(model.id),
            },
          ],
        },
        {
          title: translate('province.name'),
          key: nameof(model.name),
          sorter: true,
          sortOrder: ProvinceSearch.getOrderTypeForTable<ProvinceSearch>(nameof(model.name), sorter),
          children: [
            {
              key: withTableFilterSuffix(nameof(model.name)),
              dataIndex: nameof(model.name),
            },
          ],
        },
        {
          title: translate('general.master.actions'),
          key: 'actions',
          className: 'actions',
          children: [
            {
              key: withTableFilterSuffix('actions'),
              dataIndex: nameof(model.id),
              render: (id: number, province: Province) => {
                return (
                  <>
                    <Button htmlType="button" type="link" onClick={handleEdit(id)}>
                      {translate('province.actions.edit')}
                    </Button>
                    <Button htmlType="button" type="link" onClick={handleDelete(province)}>
                      {translate('province.actions.delete')}
                    </Button>
                  </>
                );
              },
            },
          ],
        },
      ];
    },
    [translate, sorter, pagination, handleDelete, handleEdit],
  );

  return (
    <Card title={translate('province.master.title')}>
      <Table
        className="master-table"
        rowKey="id"
        bordered
        pagination={pagination}
        columns={columns}
        dataSource={list}
        loading={loading}
        onChange={handleTableChange}
        title={() => (
          <div className="table-actions">
            <Button htmlType="button" type="primary" icon="plus" onClick={handleAdd}>
              {translate('province.actions.add')}
            </Button>
            <Button htmlType="button" type="default" icon="filter" onClick={handleReset}>
              {translate('province.actions.reset')}
            </Button>
          </div>
        )}
      />
    </Card>
  );
}

export default ProvinceMaster;
