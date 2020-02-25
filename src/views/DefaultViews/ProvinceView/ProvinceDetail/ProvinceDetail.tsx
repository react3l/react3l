import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Spin from 'antd/lib/spin';
import {formItemLayout} from 'config/ant-design/ant-design';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {defaultActions} from 'core/config';
import {crudService} from 'core/services';
import {Province} from 'models/Province';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {antTableService} from 'services';
import nameof from 'ts-nameof.macro';
import 'views/DefaultViews/ProvinceView/ProvinceDetail/ProvinceDetail.scss';
import {provinceDetailRepository} from 'views/DefaultViews/ProvinceView/ProvinceDetail/ProvinceDetailRepository';

const {Item: FormItem} = Form;

function ProvinceDetail() {
  const [translate] = useTranslation();

  const [
    province,
    setProvince,
    loading,
    setLoading,
    isDetail,
    handleGoBack,
    handleSave,
  ] = crudService.useDetail<Province>(
    PROVINCE_ROUTE,
    provinceDetailRepository.get,
    provinceDetailRepository.save,
  );

  const handleDelete = antTableService.useDeleteHandler(
    provinceDetailRepository.delete,
    setLoading,
    province,
    setProvince,
    handleGoBack,
  );

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <div className="d-flex align-items-center">
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('provinces.detail.title', province) : translate('provinces.add.title')}
          </div>
        )}>
          <div className="d-flex justify-content-end align-items-center mb-4">
            <button className="btn btn-primary" onClick={handleSave}>
              <i className="fa fa-save mr-2"/>
              {translate(defaultActions.save)}
            </button>
          </div>
          <Form {...formItemLayout}>
            <FormItem label={translate('provinces.id')}>
              <input type="text"
                     className="form-control"
                     name={nameof(province.id)}
                     defaultValue={province.id}
                     disabled
              />
            </FormItem>
            <FormItem label={translate('provinces.code')}>
              <input type="text"
                     className="form-control"
                     name={nameof(province.code)}
                     defaultValue={province.code}
              />
            </FormItem>
            <FormItem label={translate('provinces.name')}>
              <input type="text"
                     className="form-control"
                     name={nameof(province.name)}
                     defaultValue={province.name}
              />
            </FormItem>
          </Form>
          <div className="d-flex justify-content-between mt-4">
            <div className="flex-grow-1">
              {isDetail && (
                <button className="btn btn-danger" onClick={handleDelete}>
                  <i className="fa fa-trash mr-2"/>
                  {translate(defaultActions.delete)}
                </button>
              )}
            </div>
            <button className="btn btn-primary" onClick={handleSave}>
              <i className="fa fa-save mr-2"/>
              {translate(defaultActions.save)}
            </button>
          </div>
        </Card>
      </Spin>
    </div>
  );
}

export default ProvinceDetail;
