import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';
import CardTitle from 'components/CardTitle/CardTitle';
import Select from 'components/Select/Select';
import {formItemLayout} from 'config/consts';
import {COLLECTION_ROUTE} from 'config/route-consts';
import {hasError} from 'core/helpers/form';
import * as CoreHooks from 'core/hooks';
import * as Hooks from 'hooks';
import {Collection} from 'models/Collection';
import {CollectionStatus} from 'models/CollectionStatus';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import CollectionContentTable from 'views/CollectionView/CollectionDetail/CollectionContentTable/CollectionContentTable';
import './CollectionDetail.scss';

import repository from './CollectionDetailRepository';

function CollectionDetail() {
  const [translate] = useTranslation();

  // tslint:disable-next-line:max-line-length
  const [collection, setCollection, loading, setLoading, isDetail, handleGoBack, handleSave] = CoreHooks.useDetail<Collection>(COLLECTION_ROUTE, repository.get, repository.save);

  const [handleUpdateSimpleField, handleUpdateObjectField, handleUpdateDateField] = CoreHooks.useChangeHandlers<Collection>(collection, setCollection);
  const handleDelete = Hooks.useDeleteHandler<Collection>(repository.delete, setLoading, collection, setCollection);
  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  const [statuses] = CoreHooks.useEnumList<CollectionStatus>(repository.singleListCollectionStatus);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  const pageTitle = React.useMemo(
    () => isDetail ? translate('collection.detail.title', collection) : translate('collection.detail.newTitle'),
    [isDetail, collection, translate],
  );

  const actions = React.useMemo(
    () => (
      <div className="page-detail-actions">
        <Button htmlType="button" type="primary" onClick={handleSave}>
          {translate('general.actions.save')}
        </Button>
      </div>
    ),
    [handleSave, translate],
  );

  return (
    <Spin spinning={loading}>
      <div className="container-fluid page-detail product-detail">
        <Card title={<CardTitle title={pageTitle} onBack={handleGoBack}/>}>
          {actions}
          <Form {...formItemLayout}>
            <div className="row">
              <div className="col-6">
                <Form.Item label={translate('collection.id')}
                           validateStatus={hasError<Collection>(collection, nameof(collection.id))}
                           help={collection.errors?.id}
                >
                  <Input
                    type="text"
                    name={nameof(collection.id)}
                    value={collection?.id}
                    onChange={handleUpdateSimpleField(nameof(collection.id))}
                  />
                </Form.Item>
                <Form.Item label={translate('collection.name')}
                           validateStatus={hasError<Collection>(collection, nameof(collection.name))}
                           help={collection.errors?.name}
                >
                  <Input
                    type="text"
                    name={nameof(collection.name)}
                    value={collection?.name}
                    onChange={handleUpdateSimpleField(nameof(collection.name))}
                  />
                </Form.Item>
                <Form.Item label={translate('collection.slug')}
                           validateStatus={hasError<Collection>(collection, nameof(collection.slug))}
                           help={collection.errors?.slug}
                >
                  <Input
                    type="text"
                    name={nameof(collection.slug)}
                    value={collection?.slug}
                    onChange={handleUpdateSimpleField(nameof(collection.slug))}
                  />
                </Form.Item>
                <Form.Item label={translate('collection.start')}
                           validateStatus={hasError<Collection>(collection, nameof(collection.start))}
                           help={collection.errors?.start}
                >
                  <DatePicker
                    defaultValue={collection.start}
                    onChange={handleUpdateDateField(nameof(collection.start))}
                  />
                </Form.Item>
                <Form.Item label={translate('collection.end')}
                           validateStatus={hasError<Collection>(collection, nameof(collection.end))}
                           help={collection.errors?.end}
                >
                  <DatePicker
                    defaultValue={collection.end}
                    onChange={handleUpdateDateField(nameof(collection.end))}
                  />
                </Form.Item>
                <Form.Item label={translate('collection.title')}
                           validateStatus={hasError<Collection>(collection, nameof(collection.title))}
                           help={collection.errors?.title}
                >
                  <Input
                    type="text"
                    name={nameof(collection.title)}
                    value={collection?.title}
                    onChange={handleUpdateSimpleField(nameof(collection.title))}
                  />
                </Form.Item>
                <Form.Item label={translate('collection.description')}
                           validateStatus={hasError<Collection>(collection, nameof(collection.description))}
                           help={collection.errors?.description}
                >
                  <Input
                    type="text"
                    name={nameof(collection.description)}
                    value={collection?.description}
                    onChange={handleUpdateSimpleField(nameof(collection.description))}
                  />
                </Form.Item>
                <Form.Item
                  label={translate('collection.status')}
                  validateStatus={hasError<Collection>(collection, nameof(collection.status))}
                  help={collection.errors?.status}
                >
                  <Select
                    list={statuses}
                    value={collection?.statusId}
                    onChange={handleUpdateObjectField(nameof(collection.status))}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
          <Form.Item
            label={translate('collection.collectionContents')}
          >
            <CollectionContentTable model={collection}
                                    setModel={setCollection}
                                    field={nameof(collection.collectionContents)}/>
          </Form.Item>
          <div className="page-detail-actions">
            <Button htmlType="button" type="link" className="page-detail-delete" onClick={handleDelete}>
              {translate('general.actions.delete')}
            </Button>
            <Button htmlType="button" type="primary" onClick={handleSave}>
              {translate('general.actions.save')}
            </Button>
          </div>
        </Card>
      </div>
    </Spin>
  );
}

export default CollectionDetail;
