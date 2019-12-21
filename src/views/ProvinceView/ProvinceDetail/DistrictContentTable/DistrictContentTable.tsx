import Table, {ColumnProps} from 'antd/lib/table';
import MasterTableFilter, {MasterTableObjectFilter} from 'components/MasterTableFilter/MasterTableFilter';
import {MASTER_KEYS} from 'config/consts';
import {useEnumList, useLocalTable} from 'core/hooks';
import {ContentTableProps, useContentTable} from 'core/hooks/useContentTable';
import {renderMasterIndex} from 'helpers';
import {withTableFilterSuffix} from 'helpers/string';
import {District} from 'models/District';
import {DistrictSearch} from 'models/DistrictSearch';
import {DistrictType} from 'models/DistrictType';
import {Province} from 'models/Province';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import {districtFilter} from 'views/ProvinceView/ProvinceDetail/DistrictContentTable/DistrictContentTableHooks';
import repository from '../ProvinceDetailRepository';
import './DistrictContentTable.scss';

function DistrictContentTable(props: ContentTableProps<Province, 'districts'>) {
  const {model, setModel, field} = props;
  const [districts] = useContentTable<Province, 'districts'>(model, setModel, field);
  const [districtTypes] = useEnumList<DistrictType>(repository.listDistrictType);
  const [translate] = useTranslation();
  // tslint:disable-next-line:max-line-length
  const [dataSource, pagination, search, , handleChange, handleFilter, handleObjectFilter] = useLocalTable<District, DistrictSearch>(districts, districtFilter);

  const columns: Array<ColumnProps<District>> = React.useMemo(
    () => {
      const {districtType, districtTypeId, id, name} = search;
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
              title: (
                <MasterTableFilter defaultValue={id} onChange={handleFilter(nameof(id))}/>
              ),
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
              title: (
                <MasterTableFilter defaultValue={name} onChange={handleFilter(nameof(name))}/>
              ),
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
              title: (
                <MasterTableObjectFilter list={districtTypes}
                                         value={districtTypeId}
                                         onChange={handleObjectFilter(nameof(districtType))}
                />
              ),
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
    [districtTypes, districts, handleObjectFilter, pagination, search, translate],
  );

  return (
    <Table dataSource={dataSource}
           bordered
           size="small"
           rowKey={nameof(districts[0].id)}
           columns={columns}
           pagination={pagination}
           onChange={handleChange}
    />
  );
}

export default DistrictContentTable;
