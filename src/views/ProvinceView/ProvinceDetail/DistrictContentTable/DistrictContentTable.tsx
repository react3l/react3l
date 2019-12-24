import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Table, {ColumnProps} from 'antd/lib/table';
import Select from 'components/Select/Select';
import {COLUMN_WIDTH, MASTER_KEYS} from 'config/consts';
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

const columnWidth = {
  index: COLUMN_WIDTH.index,
  id: undefined,
  name: undefined,
  districtType: undefined,
  actions: COLUMN_WIDTH.actions,
};

function DistrictContentTable(props: ContentTableProps<Province, 'districts'>) {
  const {model, setModel, field} = props;

  const [districts, setDistricts] = useContentTable<Province, 'districts'>(model, setModel, field);

  const [districtTypes] = useEnumList<DistrictType>(repository.listDistrictType);

  const [translate] = useTranslation();
  // tslint:disable-next-line:max-line-length
  const [dataSource, pagination, , , handleChange] = useLocalTable<District, DistrictSearch>(districts, districtFilter);

  const handleDelete = React.useCallback(
    (id: number) => {
      return () => {
        const newDistricts: District[] = districts.filter((district: District) => district.id !== id);
        setDistricts(newDistricts);
      };
    },
    [districts, setDistricts],
  );

  const columns: Array<ColumnProps<District>> = React.useMemo(
    () => {
      return [
        {
          title: translate(MASTER_KEYS.index),
          key: nameof(MASTER_KEYS.index),
          width: columnWidth.index,
          className: 'center',
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.index)),
              width: columnWidth.index,
              className: 'center',
              render: renderMasterIndex<District>(pagination),
            },
          ],
        },
        {
          title: translate('district.id'),
          key: nameof(districts[0].id),
          width: columnWidth.id,
          dataIndex: nameof(districts[0].id),
          children: [
            {
              key: withTableFilterSuffix(nameof(districts[0].id)),
              width: columnWidth.id,
              dataIndex: nameof(districts[0].id),
              render(id: number) {
                return (
                  <Input type="number" name={nameof(districts[0].id)} defaultValue={id}/>
                );
              },
            },
          ],
        },
        {
          title: translate('district.name'),
          key: nameof(districts[0].name),
          width: columnWidth.name,
          dataIndex: nameof(districts[0].name),
          children: [
            {
              key: withTableFilterSuffix(nameof(districts[0].name)),
              width: columnWidth.name,
              dataIndex: nameof(districts[0].name),
              render(name: string) {
                return (
                  <Input type="text" name={nameof(districts[0].name)} defaultValue={name}/>
                );
              },
            },
          ],
        },
        {
          title: translate('district.districtType'),
          key: nameof(districts[0].districtType),
          width: columnWidth.districtType,
          dataIndex: nameof(districts[0].districtTypeId),
          children: [
            {
              key: withTableFilterSuffix(nameof(districts[0].districtType)),
              width: columnWidth.districtType,
              dataIndex: nameof(districts[0].districtTypeId),
              render(districtTypeId: number) {
                return (
                  <Select list={districtTypes}
                          value={districtTypeId}
                  />
                );
              },
            },
          ],
        },
        {
          title: translate(MASTER_KEYS.actions),
          key: nameof(MASTER_KEYS.actions),
          width: columnWidth.actions,
          className: 'center actions',
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.actions)),
              width: columnWidth.actions,
              dataIndex: nameof(districts[0].id),
              className: 'center actions filter-placeholder',
              render: (id: number) => {
                return (
                  <>
                    <Button htmlType="button" type="link" onClick={handleDelete(id)}>
                      {translate('general.actions.delete')}
                    </Button>
                  </>
                );
              },
            },
          ],
        },
      ];
    },
    [districtTypes, districts, handleDelete, pagination, translate],
  );

  return (
    <Table bordered
           tableLayout="fixed"
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
