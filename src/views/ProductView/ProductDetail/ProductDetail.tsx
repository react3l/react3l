import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';
import CardTitle from 'components/CardTitle/CardTitle';
import Select from 'components/Select/Select';
import {formItemLayout} from 'config/consts';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {hasError} from 'core/helpers/form';
import {useDetail, useEnumList} from 'core/hooks';
import {useChangeHandlers} from 'core/hooks/useChangeHandlers';
import {Product} from 'models/Product';
import {ProductStatus} from 'models/ProductStatus';
import {ProductType} from 'models/ProductType';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import repository from 'views/ProductView/ProductDetail/ProductDetailRepository';
import './ProductDetail.scss';

function ProductDetail() {
  // tslint:disable-next-line:max-line-length
  const [product, setProduct, loading, isDetail, handleGoBack, handleSave] = useDetail<Product>(PROVINCE_ROUTE, repository.get, repository.save);

  const [translate] = useTranslation();

  const [handleUpdateSimpleField, handleUpdateObjectField] = useChangeHandlers<Product>(product, setProduct);

  const [productStatus] = useEnumList<ProductStatus>(repository.singleListProductStatus);

  const [productTypes] = useEnumList<ProductType>(repository.singleListProductType);

  const pageTitle = React.useMemo(
    () => isDetail ? translate('product.detail.title', product) : translate('product.detail.newTitle'),
    [isDetail, product, translate],
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
                <Form.Item label={translate('product.id')}
                           validateStatus={hasError<Product>(product, nameof(product.id))}
                           help={product.errors?.id}
                >
                  <Input
                    type="text"
                    name={nameof(product.id)}
                    value={product?.id}
                    onChange={handleUpdateSimpleField(nameof(product.id), false)}
                  />
                </Form.Item>
                <Form.Item label={translate('product.name')}
                           validateStatus={hasError<Product>(product, nameof(product.name))}
                           help={product.errors?.name}
                >
                  <Input
                    type="text"
                    name={nameof(product.name)}
                    value={product?.name}
                    onChange={handleUpdateSimpleField(nameof(product.name), false)}
                  />
                </Form.Item>
                <Form.Item label={translate('product.type')}
                           validateStatus={hasError<Product>(product, nameof(product.type))}
                           help={product.errors?.type}
                >
                  <Select
                    list={productTypes}
                    value={product?.typeId}
                    onChange={handleUpdateObjectField(nameof(product.type))}
                  />
                </Form.Item>
                <Form.Item label={translate('product.status')}
                           validateStatus={hasError<Product>(product, nameof(product.status))}
                           help={product.errors?.status}
                >
                  <Select
                    list={productStatus}
                    value={product?.statusId}
                    onChange={handleUpdateObjectField(nameof(product.status))}
                  />
                </Form.Item>
                <Form.Item label={translate('product.expiredDate')}
                           validateStatus={hasError<Product>(product, nameof(product.expiredDate))}
                           help={product.errors?.expiredDate}
                >
                  <DatePicker
                    value={product.expiredDate}
                    onChange={handleUpdateSimpleField(nameof(product.expiredDate))}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </Spin>
  );
}

export default ProductDetail;
