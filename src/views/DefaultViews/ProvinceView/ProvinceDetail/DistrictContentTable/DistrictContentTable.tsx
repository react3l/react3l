import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import {Col, Row} from 'antd/lib/grid';
import Table, {ColumnProps} from 'antd/lib/table';
import AdvancedNumberFilter from 'components/AdvancedNumberFilter/AdvancedNumberFilter';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';
import {formItemLayout} from 'config/ant-design/ant-design';
import {defaultActions, defaultColumnWidth} from 'config/consts';
import {defaultKeys} from 'core/config';
import {crudService} from 'core/services';
import {ContentTableProps} from 'core/types';
import {getOrderTypeForTable, renderMasterIndex} from 'helpers/ant-design/table';
import {District} from 'models/District';
import {DistrictFilter} from 'models/DistrictFilter';
import {Province} from 'models/Province';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {antTableService} from 'services';
import nameof from 'ts-nameof.macro';
import './DistrictContentTable.scss';

const {Item: FormItem} = Form;

function DistrictContentTable(props: ContentTableProps<Province, District>) {
  const {
    field, model, setModel,
  } = props;

  const [translate] = useTranslation();

  const [districts] = crudService.useContentTable(model, setModel, field);

  const [search, setSearch] = React.useState<DistrictFilter>(new DistrictFilter());

  const [dataSource, pagination, sorter, handleTableChange, handleFilter, handleSearch, handleReset] = antTableService.useLocalTable(districts, search, setSearch);

  const columns: Array<ColumnProps<District>> = React.useMemo(() => [{
    title: translate(defaultKeys.index),
    key: nameof(defaultKeys.index),
    width: defaultColumnWidth.index,
    render: renderMasterIndex<Province>(pagination),
  }, {
    title: translate('provinces.districts.id'),
    key: nameof(districts[0].id),
    sorter: true,
    sortOrder: getOrderTypeForTable<Province>(nameof(districts[0].id), sorter),
    dataIndex: nameof(districts[0].id),
  }, {
    title: translate('provinces.districts.code'),
    sorter: true,
    sortOrder: getOrderTypeForTable<Province>(nameof(districts[0].code), sorter),
  }, {
    title: translate('provinces.districts.name'),
    key: nameof(districts[0].name),
    dataIndex: nameof(districts[0].name),
    sorter: true,
    sortOrder: getOrderTypeForTable<Province>(nameof(districts[0].name), sorter),
  }], [districts, pagination, sorter, translate]);

  return (<>
      <Card title={translate(defaultActions.search)}>
        <Form {...formItemLayout}>
          <Row>
            <Col className="pl-1" span={8}>
              <FormItem className="mb-0" label={translate('provinces.id')}>
                <AdvancedNumberFilter filterType={nameof(search.id.equal)}
                                      filter={search.id}
                                      onChange={handleFilter(nameof(districts[0].id))}
                                      className="w-100"/>
              </FormItem>
            </Col>
            <Col className="pl-1" span={8}>
              <FormItem className="mb-0" label={translate('provinces.code')}>
                <AdvancedStringFilter filterType={nameof(search.code.startWith)}
                                      filter={search.code}
                                      onChange={handleFilter(nameof(districts[0].code))}
                                      className="w-100"/>
              </FormItem>
            </Col>
            <Col className="pl-1" span={8}>
              <FormItem className="mb-0" label={translate('provinces.name')}>
                <AdvancedStringFilter filterType={nameof(search.name.startWith)}
                                      filter={search.name}
                                      onChange={handleFilter(nameof(districts[0].name))}
                                      className="w-100"/>
              </FormItem>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-2">
            <button className="btn btn-primary mr-2" onClick={handleSearch}>
              {translate(defaultActions.filter)}
            </button>
            <button className="btn btn-outline-secondary text-dark" onClick={handleReset}>
              <i className="fa mr-2 fa-times"/>
              {translate(defaultActions.reset)}
            </button>
          </div>
        </Form>
      </Card>
      <Table size="small"
             bordered
             tableLayout="fixed"
             dataSource={dataSource}
             columns={columns}
             pagination={pagination}
             onChange={handleTableChange}
      />
    </>);
}

export default DistrictContentTable;
