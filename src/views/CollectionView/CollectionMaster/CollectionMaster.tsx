import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Table, {ColumnProps} from 'antd/lib/table';
import AdvancedFilter from 'components/AdvancedFilter/AdvancedFilter';
import DatePickerFilter from 'components/DatePickerFilter/DatePickerFilter';
import DropdownFilter from 'components/DropdownFilter/DropdownFilter';
import {COLUMN_WIDTH, MASTER_KEYS} from 'config/consts';
import {COLLECTION_ROUTE} from 'config/route-consts';
import {withTableFilterSuffix} from 'core/helpers/string';
import {renderMasterIndex} from 'core/helpers/view';
import * as CoreHooks from 'core/hooks';
import * as Hooks from 'hooks';
import {Collection} from 'models/Collection';
import {CollectionSearch} from 'models/CollectionSearch';

import {CollectionStatus} from 'models/CollectionStatus';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import './CollectionMaster.scss';
import repository from './CollectionMasterRepository';

const columnWidth = {
  index: COLUMN_WIDTH.index,
  id: 250,
  name: 250,
  slug: 250,
  start: 250,
  end: 250,
  statusId: 250,
  title: 250,
  description: 250,
  status: 250,
  actions: COLUMN_WIDTH.actions,
};

const tableScroll = {
  x: 9 * 250 + COLUMN_WIDTH.actions + COLUMN_WIDTH.index,
};

function CollectionMaster() {
  const [translate] = useTranslation();
  const [search, setSearch] = CoreHooks.useQuery<CollectionSearch>(...React.useState<CollectionSearch>(new CollectionSearch()));
  // tslint:disable-next-line:max-line-length
  const [list, total, loading, , handleAdd, handleReset, handleEdit, handleFilter] = CoreHooks.useMaster<Collection, CollectionSearch>(COLLECTION_ROUTE, repository.list, repository.count, search, setSearch);
  const [pagination, sorter, handleTableChange] = Hooks.useMasterTable<Collection, CollectionSearch>(search, setSearch, total);
  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  const [statuses] = CoreHooks.useEnumList<CollectionStatus>(repository.singleListCollectionStatus);

  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------
  const columns: Array<ColumnProps<Collection>> = React.useMemo(
    () => {
      return [
        {
          title: translate(MASTER_KEYS.index),
          key: nameof(MASTER_KEYS.index),
          width: columnWidth.index,
          className: 'center',
          fixed: 'left',
          dataIndex: nameof(list[0].id),
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.index)),
              width: columnWidth.index,
              className: 'center',
              fixed: 'left',
              dataIndex: nameof(list[0].id),
              render: renderMasterIndex<Collection>(pagination),
            },
          ],
        },
        {
          title: translate('collection.id'),
          key: nameof(list[0].id),
          width: columnWidth.id,
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: CollectionSearch.getOrderTypeForTable<Collection>(nameof(list[0].id), sorter),
          children: [
            {
              key: withTableFilterSuffix(nameof(list[0].id)),
              width: columnWidth.id,
              dataIndex: nameof(list[0].id),
            },
          ],
        },
        {
          title: translate('collection.name'),
          key: nameof(list[0].name),
          width: columnWidth.name,
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: CollectionSearch.getOrderTypeForTable<Collection>(nameof(list[0].name), sorter),
          children: [
            {
              title: (
                <AdvancedFilter
                  filter={search.name}
                  defaultType={nameof(search.name.startWith)}
                  onChange={handleFilter(nameof(search.name))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].name)),
              width: columnWidth.name,
              dataIndex: nameof(list[0].name),
            },
          ],
        },
        {
          title: translate('collection.slug'),
          key: nameof(list[0].slug),
          width: columnWidth.slug,
          dataIndex: nameof(list[0].slug),
          sorter: true,
          sortOrder: CollectionSearch.getOrderTypeForTable<Collection>(nameof(list[0].slug), sorter),
          children: [
            {
              title: (
                <AdvancedFilter
                  filter={search.slug}
                  defaultType={nameof(search.slug.startWith)}
                  onChange={handleFilter(nameof(search.slug))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].slug)),
              width: columnWidth.slug,
              dataIndex: nameof(list[0].slug),
            },
          ],
        },
        {
          title: translate('collection.start'),
          key: nameof(list[0].start),
          width: columnWidth.start,
          dataIndex: nameof(list[0].start),
          sorter: true,
          sortOrder: CollectionSearch.getOrderTypeForTable<Collection>(nameof(list[0].start), sorter),
          children: [
            {
              title: (
                <DatePickerFilter filter={search.start}
                                  defaultType={nameof(search.start.equal)}
                                  onChange={handleFilter(nameof(search.start))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].start)),
              width: columnWidth.start,
              dataIndex: nameof(list[0].start),
            },
          ],
        },
        {
          title: translate('collection.end'),
          key: nameof(list[0].end),
          width: columnWidth.end,
          dataIndex: nameof(list[0].end),
          sorter: true,
          sortOrder: CollectionSearch.getOrderTypeForTable<Collection>(nameof(list[0].end), sorter),
          children: [
            {
              title: (
                <DatePickerFilter filter={search.end}
                                  defaultType={nameof(search.end.equal)}
                                  onChange={handleFilter(nameof(search.end))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].end)),
              width: columnWidth.end,
              dataIndex: nameof(list[0].end),
            },
          ],
        },
        {
          title: translate('collection.statusId'),
          key: nameof(list[0].statusId),
          width: columnWidth.statusId,
          dataIndex: nameof(list[0].statusId),
          sorter: true,
          sortOrder: CollectionSearch.getOrderTypeForTable<Collection>(nameof(list[0].statusId), sorter),
          children: [
            {
              key: withTableFilterSuffix(nameof(list[0].statusId)),
              width: columnWidth.statusId,
              dataIndex: nameof(list[0].statusId),
            },
          ],
        },
        {
          title: translate('collection.title'),
          key: nameof(list[0].title),
          width: columnWidth.title,
          dataIndex: nameof(list[0].title),
          sorter: true,
          sortOrder: CollectionSearch.getOrderTypeForTable<Collection>(nameof(list[0].title), sorter),
          children: [
            {
              title: (
                <AdvancedFilter
                  filter={search.title}
                  defaultType={nameof(search.title.startWith)}
                  onChange={handleFilter(nameof(search.title))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].title)),
              width: columnWidth.title,
              dataIndex: nameof(list[0].title),
            },
          ],
        },
        {
          title: translate('collection.description'),
          key: nameof(list[0].description),
          width: columnWidth.description,
          dataIndex: nameof(list[0].description),
          sorter: true,
          sortOrder: CollectionSearch.getOrderTypeForTable<Collection>(nameof(list[0].description), sorter),
          children: [
            {
              title: (
                <AdvancedFilter
                  filter={search.description}
                  defaultType={nameof(search.description.startWith)}
                  onChange={handleFilter(nameof(search.description))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].description)),
              width: columnWidth.description,
              dataIndex: nameof(list[0].description),
            },
          ],
        },
        {
          title: translate('collection.status'),
          key: nameof(list[0].status),
          width: columnWidth.status,
          dataIndex: nameof(list[0].status),
          sorter: true,
          sortOrder: CollectionSearch.getOrderTypeForTable<Collection>(nameof(list[0].statusId), sorter),
          children: [
            {
              title: (
                <DropdownFilter
                  list={statuses}
                  filter={search.statusId}
                  onChange={handleFilter(nameof(search.statusId))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].status)),
              width: columnWidth.status,
              dataIndex: nameof(list[0].status),
              render(collectionStatus: CollectionStatus) {
                return collectionStatus?.id;
              },
            },
          ],
        },
        {
          title: translate(MASTER_KEYS.actions),
          key: nameof(MASTER_KEYS.actions),
          width: columnWidth.actions,
          className: 'center actions',
          fixed: 'right',
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.actions)),
              dataIndex: nameof(list[0].id),
              width: columnWidth.actions,
              className: 'center actions filter-placeholder',
              fixed: 'right',
              render: (id: number) => {
                return (
                  <>
                    <Button htmlType="button" type="link" onClick={handleEdit(id)}>
                      {translate('general.actions.edit')}
                    </Button>
                  </>
                );
              },
            },
          ],
        },
      ];
    },
    // tslint:disable-next-line:max-line-length
    [translate, list, pagination, sorter, search.name, search.slug, search.start, search.end, search.title, search.description, search.statusId, handleFilter, statuses, handleEdit],
  );

  return (
    <Card title={translate('collection.master.title')}>
      <Table
        tableLayout="fixed"
        className="master-table collection-master-table"
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
        scroll={tableScroll}
      />
    </Card>
  );
}

export default CollectionMaster;
