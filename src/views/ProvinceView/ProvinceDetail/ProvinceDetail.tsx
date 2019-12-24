import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
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
import {Province} from 'models/Province';
import {ProvinceType} from 'models/ProvinceType';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import DistrictContentTable from 'views/ProvinceView/ProvinceDetail/DistrictContentTable/DistrictContentTable';
import repository from 'views/ProvinceView/ProvinceDetail/ProvinceDetailRepository';
import './ProvinceDetail.scss';

function ProvinceDetail() {
  // tslint:disable-next-line:max-line-length
  const [province, setProvince, loading, isDetail, handleGoBack, handleSave] = useDetail<Province>(PROVINCE_ROUTE, repository.get, repository.save);

  const [translate] = useTranslation();

  const [handleUpdateSimpleField, handleUpdateObjectField] = useChangeHandlers<Province>(province, setProvince);

  const [provinceTypes] = useEnumList<ProvinceType>(repository.listProvinceType);

  const pageTitle = React.useMemo(
    () => isDetail ? translate('province.detail.title', province) : translate('province.detail.newTitle'),
    [isDetail, province, translate],
  );

  const districtTableTitle = React.useMemo(
    () => {
      if (isDetail) {
        return translate('province.detail.districts.title', province);
      }
      return translate('province.detail.districts.newTitle');
    },
    [isDetail, province, translate],
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
                <Form.Item label={translate('province.id')}
                           validateStatus={hasError<Province>(province, nameof(province.id))}
                           help={province.errors?.id}
                >
                  <Input
                    type="text"
                    name={nameof(province.id)}
                    value={province?.id}
                    onChange={handleUpdateSimpleField(nameof(province.id), false)}
                  />
                </Form.Item>
                <Form.Item label={translate('province.name')}
                           validateStatus={hasError<Province>(province, nameof(province.name))}
                           help={province.errors?.name}
                >
                  <Input
                    type="text"
                    name={nameof(province.name)}
                    value={province?.name}
                    onChange={handleUpdateSimpleField(nameof(province.name), false)}
                  />
                </Form.Item>
                <Form.Item label={translate('province.provinceType')}
                           validateStatus={hasError<Province>(province, nameof(province.provinceType))}
                           help={province.errors?.provinceType}
                >
                  <Select
                    list={provinceTypes}
                    value={province?.provinceTypeId}
                    onChange={handleUpdateObjectField(nameof(province.provinceType))}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </Card>

        {isDetail && (
          <Card title={districtTableTitle}>
            <DistrictContentTable model={province} setModel={setProvince} field="districts"/>
            {actions}
          </Card>
        )}
      </div>
    </Spin>
  );
}

export default ProvinceDetail;
