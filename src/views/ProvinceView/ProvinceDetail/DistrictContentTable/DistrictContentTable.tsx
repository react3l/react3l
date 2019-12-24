import Table, {ColumnProps} from 'antd/lib/table';
import {MASTER_KEYS} from 'config/consts';
import {renderMasterIndex} from 'core/helpers';
import {withTableFilterSuffix} from 'core/helpers/string';
import {useEnumList, useLocalTable} from 'core/hooks';
import {ContentTableProps, useContentTable} from 'core/hooks/useContentTable';
import {District} from 'models/District';
import {DistrictSearch} from 'models/DistrictSearch';
import {DistrictType} from 'models/DistrictType';
import {Province} from 'models/Province';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import repository from 'views/ProvinceView/ProvinceDetail/ProvinceDetailRepository';
import {districtFilter} from 'views/ProvinceView/ProvinceHooks';
import './DistrictContentTable.scss';

function DistrictContentTable(props: ContentTableProps<Province, 'districts'>) {
  const {model, setModel, field} = props;

  const [districts] = useContentTable<Province, 'districts'>(model, setModel, field);

  const [districtTypes] = useEnumList<DistrictType>(repository.listDistrictType);

  const [translate] = useTranslation();
  // tslint:disable-next-line:max-line-length
  const [dataSource, pagination, , , handleChange] = useLocalTable<District, DistrictSearch>(districts, districtFilter);

  const columns: Array<ColumnProps<District>> = React.useMemo(
    () => {
      return [
        {
          title: translate(MASTER_KEYS.index),
          key: nameof(MASTER_KEYS.index),
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.index)),
              render: renderMasterIndex<District>(pagination),
            },
          ],
        },
        {
          title: translate('district.id'),
          key: nameof(districts[0].id),
          dataIndex: nameof(districts[0].id),
          children: [
            {
              key: withTableFilterSuffix(nameof(districts[0].id)),
              dataIndex: nameof(districts[0].id),
            },
          ],
        },
        {
          title: translate('district.name'),
          key: nameof(districts[0].name),
          dataIndex: nameof(districts[0].name),
          children: [
            {
              key: withTableFilterSuffix(nameof(districts[0].name)),
              dataIndex: nameof(districts[0].name),
            },
          ],
        },
        {
          title: translate('district.districtType'),
          key: nameof(districts[0].districtType),
          dataIndex: nameof(districts[0].districtTypeId),
          children: [
            {
              key: withTableFilterSuffix(nameof(districts[0].districtType)),
              dataIndex: nameof(districts[0].districtTypeId),
              render(districtTypeId: number) {
                return districtTypes.find((districtType: DistrictType) => districtType.id === districtTypeId)?.name;
              },
            },
          ],
        },
      ];
    },
    [districtTypes, districts, pagination, translate],
  );

  return (
    <Table bordered
           size="small"
           dataSource={dataSource}
           rowKey={nameof(districts[0].id)}
           columns={columns}
           pagination={pagination}
           onChange={handleChange}
    />
  );
}

export default DistrictContentTable;
