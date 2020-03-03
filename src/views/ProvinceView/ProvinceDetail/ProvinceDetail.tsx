import React from 'react';
import './ProvinceDetail.scss';
import DatePicker from 'antd/lib/date-picker';
import Switch from 'antd/lib/switch';
import {crudService, routerService} from 'core/services';
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
import InputNumber from 'components/InputNumber/InputNumber';

const {Item: FormItem} = Form;

function ProvinceDetail() {
  const [translate] = useTranslation();
  const [handleGoBack] = routerService.useGoBack();

  const [
    province,
    setProvince,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Province,
    provinceRepository.get,
    provinceRepository.save,
  );

  const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Province>(province, setProvince);

  /**
   * This section is for enums
   */
  const [provinceTypes] = crudService.useEnumList<ProvinceType>(
    provinceRepository.singleListProvinceType,
  );

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('provinces.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>
            <FormItem label={translate('provinces.id')}>
              {/* Number field */}
              <InputNumber defaultValue={province.id}
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(province.id))}
              />
            </FormItem>
            <FormItem label={translate('provinces.code')}>
              {/* Text field */}
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(province.code)}
                     defaultValue={province.code}
                     onChange={handleChangeSimpleField(nameof(province.code))}
              />
            </FormItem>
            <FormItem label={translate('provinces.name')}>
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(province.name)}
                     defaultValue={province.name}
                     onChange={handleChangeSimpleField(nameof(province.name))}
              />
            </FormItem>
            <FormItem label={translate('provinces.provinceType')}>
              {/* Enum field */}
              <Select value={province.provinceTypeId}
                      onChange={handleChangeObjectField(nameof(province.provinceType))}
                      list={provinceTypes}
              />
            </FormItem>
            <FormItem label={translate('provinces.createdAt')}>
              {/* Date field */}
              <DatePicker defaultValue={province.createdAt}
                          onChange={handleChangeDateField(nameof(province.createdAt))}
                          className="w-100"
              />
            </FormItem>
            <FormItem label={translate('provinces.isActive')}>
              {/* Boolean field */}
              <Switch defaultChecked={province.isActive}
                      onChange={handleChangeSimpleField(nameof(province.isActive))}
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
