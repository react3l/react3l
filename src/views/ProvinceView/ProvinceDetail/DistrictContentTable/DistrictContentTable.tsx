import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Table, {ColumnProps} from 'antd/lib/table';
import Select from 'components/Select/Select';
import {COLUMN_WIDTH, MASTER_KEYS} from 'config/consts';
import {renderMasterIndex} from 'core/helpers';
import {hasError} from 'core/helpers/form';
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

function DistrictContentTable(props: ContentTableProps<Province, District>) {
  const {model, setModel, field} = props;

  const [districts, , handleAdd, handleDelete] = useContentTable<Province, District>(model, setModel, field);

  const [districtTypes] = useEnumList<DistrictType>(repository.listDistrictType);

  const [translate] = useTranslation();
  // tslint:disable-next-line:max-line-length
  const [dataSource, , , , handleChange] = useLocalTable<District, DistrictSearch>(districts, districtFilter);

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
              render: renderMasterIndex<District>(),
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
              render(id: number, district: District) {
                return (
                  <Form.Item validateStatus={hasError<District>(district, nameof(district.id))}
                             help={district?.errors?.id}
                  >
                    <Input type="number" name={nameof(districts[0].id)} defaultValue={id}/>
                  </Form.Item>
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
              render(name: string, district: District) {
                return (
                  <Form.Item validateStatus={hasError<District>(district, nameof(district.name))}
                             help={district?.errors?.name}
                  >
                    <Input type="text" name={nameof(districts[0].name)} defaultValue={name}/>
                  </Form.Item>
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
              render(districtTypeId: number, district: District) {
                return (
                  <Form.Item validateStatus={hasError<District>(district, nameof(district.districtType))}
                             help={district?.errors?.districtType}
                  >
                    <Select list={districtTypes}
                            value={districtTypeId}
                    />
                  </Form.Item>
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
    [districtTypes, districts, handleDelete, translate],
  );

  return (
    <Table bordered
           tableLayout="fixed"
           size="small"
           dataSource={dataSource}
           rowKey={nameof(districts[0].id)}
           columns={columns}
           pagination={false}
           onChange={handleChange}
           footer={() => (
             <>
               <Button htmlType="button" type="link" onClick={handleAdd}>
                 {translate('general.actions.add')}
               </Button>
             </>
           )}
    />
  );
}

export default DistrictContentTable;
