import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Table, {ColumnProps} from 'antd/lib/table';
import AdvancedIdFilter from 'components/AdvancedIdFilter/AdvancedIdFilter';
import AdvancedNumberFilter from 'components/AdvancedNumberFilter/AdvancedNumberFilter';
import InputNumber from 'components/InputNumber/InputNumber';
import Select from 'components/Select/Select';
import {COLUMN_WIDTH, MASTER_KEYS} from 'config/consts';
import {renderMasterIndex} from 'core/helpers';
import {hasError} from 'core/helpers/form';
import {withTableFilterSuffix} from 'core/helpers/string';
import {ContentTableProps, useContentTable} from 'core/hooks/useContentTable';
import * as Hooks from 'hooks';
import {Collection} from 'models/Collection';
import {CollectionContent} from 'models/CollectionContent';
import {CollectionContentSearch} from 'models/CollectionContentSearch';
import {Product} from 'models/Product';
import {ProductSearch} from 'models/ProductSearch';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import collectionDetailRepository from 'views/CollectionView/CollectionDetail/CollectionDetailRepository';
import './CollectionContentTable.scss';

const columnWidth = {
  index: COLUMN_WIDTH.index,
  id: undefined,
  name: undefined,
  product: undefined,
  collectionContentType: undefined,
  actions: COLUMN_WIDTH.actions,
};

function CollectionContentTable(props: ContentTableProps<Collection, CollectionContent>) {
  const {
    model: collection,
    setModel: setCollection,
    field,
  } = props;

  const [collectionContents, , handleAdd, handleDelete] = useContentTable<Collection, CollectionContent>(collection, setCollection, field);

  const [translate] = useTranslation();

  const [search, setSearch] = React.useState<CollectionContentSearch>(new CollectionContentSearch());

  const [dataSource, , sorter, handleTableChange, handleFilter] = Hooks.useLocalTable(collectionContents, search, setSearch);

  const [productSearch, setProductSearch] = React.useState<ProductSearch>(new ProductSearch());

  const columns: Array<ColumnProps<CollectionContent>> = React.useMemo(
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
              render: renderMasterIndex<CollectionContent>(),
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
              render(id: number, collectionContent: CollectionContent) {
                return (
                  <Form.Item
                    validateStatus={hasError<CollectionContent>(collectionContent, nameof(collectionContent.id))}
                    help={collectionContent?.errors?.id}
                  >
                    <InputNumber name={nameof(collectionContents[0].id)} defaultValue={id}/>
                  </Form.Item>
                );
              },
            },
          ],
        },
        {
          title: translate('collectionContent.product'),
          key: nameof(collectionContents[0].productId),
          width: columnWidth.product,
          dataIndex: nameof(collectionContents[0].productId),
          sorter: true,
          sortOrder: CollectionContentSearch.getOrderTypeForTable<Collection>(nameof(collectionContents[0].productId), sorter),
          children: [
            {
              title: (
                <AdvancedIdFilter
                  filter={search.productId}
                  getList={collectionDetailRepository.singleListProduct}
                  search={productSearch}
                  setSearch={setProductSearch}
                />
              ),
              key: withTableFilterSuffix(nameof(collectionContents[0].product)),
              width: columnWidth.product,
              dataIndex: nameof(collectionContents[0].product),
              render(product: Product, collectionContent: CollectionContent) {
                return (
                  <Form.Item
                    validateStatus={hasError<CollectionContent>(collectionContent, nameof(collectionContent.product))}
                    help={collectionContent?.errors?.name}
                  >
                    <Select
                      value={product?.id}
                      getList={collectionDetailRepository.singleListProduct}
                      search={productSearch}
                      setSearch={setProductSearch}
                    />
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
    [collectionContents, handleDelete, handleFilter, productSearch, search.id, search.productId, sorter, translate],
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
