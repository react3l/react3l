import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';
import {useDetail} from 'core/hooks';
import {useChangeHandlers} from 'core/hooks/useChangeHandlers';
import {Province} from 'models/Province';
import React from 'react';
import nameOf from 'ts-nameof.macro';
import './ProvinceDetail.scss';
import provinceDetailRepository from './ProvinceDetailRepository';

function ProvinceDetail() {
  const [province, setProvince, loading] = useDetail<Province>(provinceDetailRepository.get);

  const [
    handleUpdateSimpleField,
  ] = useChangeHandlers<Province>(province, setProvince);

  return (
    <Spin spinning={loading}>
      <Form>
        <Form.Item>
          <Input
            type="text"
            name={nameOf(province.name)}
            value={province.name}
            onChange={handleUpdateSimpleField(nameOf(province.name))}
          />
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default ProvinceDetail;
