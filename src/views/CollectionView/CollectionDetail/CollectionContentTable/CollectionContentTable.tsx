import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Table, {ColumnProps} from 'antd/lib/table';
import AdvancedFilter from 'components/AdvancedFilter/AdvancedFilter';
import AdvancedNumberFilter from 'components/AdvancedNumberFilter/AdvancedNumberFilter';
import {COLUMN_WIDTH, MASTER_KEYS} from 'config/consts';
import {renderMasterIndex} from 'core/helpers';
import {hasError} from 'core/helpers/form';
import {withTableFilterSuffix} from 'core/helpers/string';
import {ContentTableProps, useContentTable} from 'core/hooks/useContentTable';
import * as Hooks from 'hooks';
import {Collection} from 'models/Collection';
import {CollectionContent} from 'models/CollectionContent';
import {CollectionContentSearch} from 'models/CollectionContentSearch';
import {District} from 'models/District';
import {Province} from 'models/Province';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import './CollectionContentTable.scss';

const columnWidth = {
  index: COLUMN_WIDTH.index,
  id: undefined,
  name: undefined,
  productId: undefined,
  collectionContentType: undefined,
  actions: COLUMN_WIDTH.actions,
};

function CollectionContentTable(props: ContentTableProps<Province, District>) {
  const {
    model: collection,
    setModel: setCollection,
    field,
  } = props;

  const [collectionContents, , handleAdd, handleDelete] = useContentTable<Collection, CollectionContent>(collection, setCollection, field);

  const [translate] = useTranslation();

  const [search, setSearch] = React.useState<CollectionContentSearch>(new CollectionContentSearch());

  const [dataSource, , sorter, handleTableChange, handleFilter] = Hooks.useLocalTable(collectionContents, search, setSearch);

  const columns: Array<ColumnProps<District>> = React.useMemo(
    () => {
      return [
        {
          title: translate(MASTER_KEYS.index),
          key: nameof(MASTER_KEYS.index),
          width: columnWidth.index,
          className: 'center',
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.index)),
              width: columnWidth.index,
              className: 'center',
              render: renderMasterIndex<District>(),
            },
          ],
        },
        {
          title: translate('collectionContent.id'),
          key: nameof(collectionContents[0].id),
          width: columnWidth.id,
          dataIndex: nameof(collectionContents[0].id),
          sorter: true,
          sortOrder: CollectionContentSearch.getOrderTypeForTable<Collection>(nameof(collectionContents[0].id), sorter),
          children: [
            {
              title: (
                <AdvancedNumberFilter filter={search.id}
                                      defaultType={nameof(search.id.equal)}
                                      onChange={handleFilter(nameof(search.id))}
                />
              ),
              key: withTableFilterSuffix(nameof(collectionContents[0].id)),
              width: columnWidth.id,
              dataIndex: nameof(collectionContents[0].id),
              render(id: number, collectionContent: District) {
                return (
                  <Form.Item validateStatus={hasError<District>(collectionContent, nameof(collectionContent.id))}
                             help={collectionContent?.errors?.id}
                  >
                    <Input type="number" name={nameof(collectionContents[0].id)} defaultValue={id}/>
                  </Form.Item>
                );
              },
            },
          ],
        },
        {
          title: translate('collectionContent.productId'),
          key: nameof(collectionContents[0].productId),
          width: columnWidth.productId,
          dataIndex: nameof(collectionContents[0].productId),
          sorter: true,
          sortOrder: CollectionContentSearch.getOrderTypeForTable<Collection>(nameof(collectionContents[0].productId), sorter),
          children: [
            {
              title: (
                <AdvancedFilter filter={search.productId}
                                defaultType={nameof(search.productId.equal)}
                                onChange={handleFilter(nameof(search.productId))}
                />
              ),
              key: withTableFilterSuffix(nameof(collectionContents[0].name)),
              width: columnWidth.name,
              dataIndex: nameof(collectionContents[0].name),
              render(name: string, collectionContent: District) {
                return (
                  <Form.Item validateStatus={hasError<District>(collectionContent, nameof(collectionContent.name))}
                             help={collectionContent?.errors?.name}
                  >
                    <Input type="text" name={nameof(collectionContents[0].name)} defaultValue={name}/>
                  </Form.Item>
                );
              },
            },
          ],
        },
        {
          title: translate(MASTER_KEYS.actions),
          key: nameof(MASTER_KEYS.actions),
          width: columnWidth.actions,
          className: 'center actions',
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.actions)),
              width: columnWidth.actions,
              dataIndex: nameof(collectionContents[0].id),
              className: 'center actions filter-placeholder',
              render: (id: number) => {
                return (
                  <>
                    <Button htmlType="button" type="link" onClick={handleDelete(id)}>
                      {translate('general.actions.delete')}
                    </Button>
                  </>
                );
              },
            },
          ],
        },
      ];
    },
    [collectionContents, handleDelete, handleFilter, search.id, search.productId, sorter, translate],
  );

  return (
    <Table bordered
           tableLayout="fixed"
           onChange={handleTableChange}
           size="small"
           dataSource={dataSource}
           columns={columns}
           pagination={false}
           footer={() => (
             <>
               <Button htmlType="button" type="link" onClick={handleAdd}>
                 {translate('general.actions.add')}
               </Button>
             </>
           )}
    />
  );
}

export default CollectionContentTable;
