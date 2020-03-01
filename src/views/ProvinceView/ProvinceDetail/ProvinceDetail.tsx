import React from 'react';
import './ProvinceDetail.scss';
import {crudService} from 'core/services';
import {provinceRepository} from 'views/ProvinceView/ProvinceRepository';
import {Province} from 'models/Province';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import {useTranslation} from 'react-i18next';
import {generalLanguageKeys} from 'config/consts';
import {defaultDetailFormLayout} from 'config/ant-design/form';
import {ProvinceType} from 'models/ProvinceType';
import Select from 'components/Select/Select';
import nameof from 'ts-nameof.macro';

const {Item: FormItem} = Form;

function ProvinceDetail() {
  const [
    province,
    setProvince,
    loading,
    ,
    ,
    handleSave,
  ] = crudService.useDetail(
    Province,
    provinceRepository.get,
    provinceRepository.save,
  );

  const [translate] = useTranslation();

  const [provinceTypes] = crudService.useEnumList<ProvinceType>(
    provinceRepository.singleListProvinceType,
  );

  const [
    handleChangeSimpleField,
    handleChangeObjectField,
  ] = crudService.useChangeHandlers<Province>(province, setProvince);

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={translate('provinces.detail.title')}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>
            <FormItem label={translate('provinces.id')}>
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(province.id)}
                     value={province.id}
                     onChange={handleChangeSimpleField(nameof(province.id))}
              />
            </FormItem>
            <FormItem label={translate('provinces.code')}>
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(province.code)}
                     value={province.code}
                     onChange={handleChangeSimpleField(nameof(province.code))}
              />
            </FormItem>
            <FormItem label={translate('provinces.name')}>
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(province.name)}
                     value={province.name}
                     onChange={handleChangeSimpleField(nameof(province.name))}
              />
            </FormItem>
            <FormItem label={translate('provinces.provinceType')}>
              <Select value={province.provinceTypeId}
                      onChange={handleChangeObjectField(nameof(province.provinceType))}
                      list={provinceTypes}
              />
            </FormItem>
          </Form>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
      </Spin>
    </div>
  );
}

export default ProvinceDetail;
