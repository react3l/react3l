import Card from 'antd/lib/card';
import Empty from 'antd/lib/empty';
import Form from 'antd/lib/form';
import {Col, Row} from 'antd/lib/grid';
import Table, {ColumnProps} from 'antd/lib/table';
import AdvancedStringFilter from 'components/ant-design/AdvancedStringFilter/AdvancedStringFilter';
import MasterPreview from 'components/MasterPreview/MasterPreview';
import {formItemLayout} from 'config/ant-design';
import {defaultColumnWidth} from 'config/consts';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {defaultKeys} from 'core/config';
import {crudService} from 'core/services';
import {getOrderTypeForTable, renderMasterIndex} from 'helpers/ant-design/table';
import {Province} from 'models/Province';
import {ProvinceFilter} from 'models/ProvinceFilter';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {antTableService} from 'services';
import nameof from 'ts-nameof.macro';
import 'views/DefaultViews/ProvinceView/ProvinceMaster/ProvinceMaster.scss';
import {provinceMasterRepository} from 'views/DefaultViews/ProvinceView/ProvinceMaster/ProvinceMasterRepository';

const {Item: FormItem} = Form;

function ProvinceMaster() {
  const [translate] = useTranslation();
  const [
    provinces,
    search,
    setSearch,
    total,
    loading,
    handleAdd,
    handleReset,
    handleEdit,
    handleFilter,
    visible,
    province,
    handlePreview,
    handleClosePreview,
  ] = crudService.useMaster<Province, ProvinceFilter>(
    PROVINCE_ROUTE,
    provinceMasterRepository.list,
    provinceMasterRepository.count,
    ProvinceFilter,
  );

  const [pagination, sorter, handleTableChange] = antTableService.useMasterTable(search, setSearch, total);

  const columns: Array<ColumnProps<Province>> = React.useMemo(
    () => [
      {
        title: translate('general.keys.index'),
        key: nameof(defaultKeys.index),
        width: defaultColumnWidth.index,
        render: renderMasterIndex<Province>(pagination),
      },
      {
        title: translate('provinces.id'),
        key: nameof(province.id),
        sorter: true,
        sortOrder: getOrderTypeForTable<Province>(nameof(province.id), sorter),
        dataIndex: nameof(province.id),
      },
      {
        title: translate('provinces.code'),
        sorter: true,
        sortOrder: getOrderTypeForTable<Province>(nameof(province.code), sorter),
      },
      {
        title: translate('provinces.name'),
        key: nameof(province.name),
        dataIndex: nameof(province.name),
        sorter: true,
        sortOrder: getOrderTypeForTable<Province>(nameof(province.name), sorter),
      },
      {
        title: translate('general.actions.label'),
        key: nameof(defaultKeys.actions),
        dataIndex: nameof(province.id),
        width: defaultColumnWidth.actions,
        align: 'center',
        render(id: number, province: Province) {
          return (
            <div className="d-flex justify-content-center">
              <button className="btn btn-link text-warning" onClick={handlePreview(province)}>
                <i className="fa fa-eye"/>
              </button>
              <button className="btn btn-link" onClick={handleEdit(id)}>
                <i className="fa fa-edit"/>
              </button>
            </div>
          );
        },
      },
    ],
    [handleEdit, handlePreview, pagination, province.code, province.id, province.name, sorter, translate],
  );

  return (
    <>
      <Card title={translate('provinces.master.title')}>
        <Card className="mb-2">
          <Form {...formItemLayout}>
            <Row>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('provinces.id')}>
                  <AdvancedStringFilter defaultType={nameof(search.id.equal)}
                                        onChange={handleFilter(nameof(province.id))}
                                        filter={search.id}
                                        className="w-100"/>
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('provinces.code')}>
                  <AdvancedStringFilter defaultType={nameof(search.code.startWith)}
                                        onChange={handleFilter(nameof(province.code))}
                                        filter={search.code}
                                        className="w-100"/>
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('provinces.name')}>
                  <AdvancedStringFilter defaultType={nameof(search.name.startWith)}
                                        onChange={handleFilter(nameof(province.name))}
                                        filter={search.name}
                                        className="w-100"/>
                </FormItem>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary mr-2">
                {translate('general.actions.filter')}
              </button>
              <button className="btn btn-outline-secondary text-dark" onClick={handleReset}>
                <i className="fa mr-2 fa-times"/>
                {translate('general.actions.reset')}
              </button>
            </div>
          </Form>
        </Card>
        <Table dataSource={provinces}
               columns={columns}
               bordered
               size="small"
               tableLayout="fixed"
               loading={loading}
               rowKey={nameof(province.id)}
               pagination={pagination}
               onChange={handleTableChange}
               title={() => (
                 <>
                   <div className="d-flex justify-content-between">
                     <div className="flex-shrink-1 d-flex align-items-center">
                       <button className="btn btn-primary mr-2" onClick={handleAdd}>
                         <i className="fa mr-2 fa-plus"/>
                         {translate('general.actions.add')}
                       </button>
                     </div>
                     <div className="flex-shrink-1 d-flex align-items-center">
                       {translate('general.master.pagination', {pageSize: pagination.pageSize, total})}
                     </div>
                   </div>
                 </>
               )}
        />
        <MasterPreview isOpen={visible} onClose={handleClosePreview} size="xl">
          <Empty/>
        </MasterPreview>
      </Card>
    </>
  );
}

export default ProvinceMaster;
