import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {crudService} from 'core/services';
import {ProvinceSearch} from 'models/ProvinceSearch';
import React from 'react';
import nameof from 'ts-nameof.macro';
import 'views/DefaultViews/ProvinceView/ProvinceMaster/ProvinceMaster.scss';
import {provinceMasterRepository} from 'views/DefaultViews/ProvinceView/ProvinceMaster/ProvinceMasterRepository';

function ProvinceMaster() {
  const [provinces] = crudService.useMaster(
    PROVINCE_ROUTE,
    provinceMasterRepository.list,
    provinceMasterRepository.count,
    ProvinceSearch,
  );

  return (
    <Card>
      <Table dataSource={provinces} rowKey={nameof(provinces[0].id)}>
      </Table>
    </Card>
  );
}

export default ProvinceMaster;
