import {Descriptions} from 'antd';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import {Col, Row} from 'antd/lib/grid';
import Table, {ColumnProps} from 'antd/lib/table';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';
import MasterPreview from 'components/MasterPreview/MasterPreview';
import {formItemLayout} from 'config/ant-design/form';
import {crudService, routerService} from 'core/services';
import {getOrderTypeForTable, renderMasterIndex} from 'helpers/ant-design/table';
import {Province} from 'models/Province';
import {ProvinceFilter} from 'models/ProvinceFilter';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import './ProvinceMaster.scss';
import {provinceMasterRepository} from 'views/ProvinceView/ProvinceMaster/ProvinceMasterRepository';
import {tableService} from 'services';
import {generalColumnWidths, generalLanguageKeys} from 'config/consts';
import {PROVINCE_ROUTE} from 'config/route-consts';

const {Item: FormItem} = Form;

function ProvinceMaster() {
  const [translate] = useTranslation();

  const [
    filter,
    setFilter,
    list,
    ,
    loading,
    ,
    total,
    previewVisible,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
    handleFilter,
    handleSearch,
    handleReset,
  ] = crudService.useMaster<Province, ProvinceFilter>(
    Province,
    ProvinceFilter,
    provinceMasterRepository.list,
    provinceMasterRepository.count,
  );

  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total);

  const [rowSelection, hasSelected] = tableService.useRowSelection<Province>();

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(PROVINCE_ROUTE);

  const columns: ColumnProps<Province>[] = React.useMemo(() => [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<Province>(pagination),
      },
      {
        title: translate('provinces.id'),
        key: nameof(list[0].id),
        sorter: true,
        sortOrder: getOrderTypeForTable<Province>(nameof(list[0].id), sorter),
        dataIndex: nameof(list[0].id),
      },
      {
        title: translate('provinces.name'),
        key: nameof(list[0].name),
        dataIndex: nameof(list[0].name),
        sorter: true,
        sortOrder: getOrderTypeForTable<Province>(nameof(list[0].name), sorter),
      },
      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.columns.actions),
        dataIndex: nameof(list[0].id),
        width: generalColumnWidths.actions,
        align: 'center',
        render(id: number, province: Province) {
          return (<div className="d-flex justify-content-center">
            <button className="btn btn-link text-warning" onClick={handleOpenPreview(province)}>
              <i className="fa fa-eye"/>
            </button>
            <button className="btn btn-link" onClick={handleGoDetail(id)}>
              <i className="fa fa-edit"/>
            </button>
          </div>);
        },
      },
    ],
    [handleGoDetail, handleOpenPreview, list, pagination, sorter, translate],
  );

  return (
    <div className="page master-page">
      <Card title={translate('provinces.master.title')}>
        <Card className="mb-4" title={translate(generalLanguageKeys.actions.search)}>
          <Form {...formItemLayout}>
            <Row>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('provinces.id')}>
                  <AdvancedStringFilter filterType={nameof(filter.id.equal)}
                                        filter={filter.id}
                                        onChange={handleFilter(nameof(previewModel.id))}
                                        className="w-100"/>
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('provinces.code')}>
                  <AdvancedStringFilter filterType={nameof(filter.code.startWith)}
                                        filter={filter.code}
                                        onChange={handleFilter(nameof(previewModel.code))}
                                        className="w-100"/>
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('provinces.name')}>
                  <AdvancedStringFilter filterType={nameof(filter.name.startWith)}
                                        filter={filter.name}
                                        onChange={handleFilter(nameof(previewModel.name))}
                                        className="w-100"/>
                </FormItem>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-2">
              <button className="btn btn-primary mr-2" onClick={handleSearch}>
                {translate(generalLanguageKeys.actions.filter)}
              </button>
              <button className="btn btn-outline-secondary text-dark" onClick={handleReset}>
                <i className="fa mr-2 fa-times"/>
                {translate(generalLanguageKeys.actions.reset)}
              </button>
            </div>
          </Form>
        </Card>
        <Table dataSource={list}
               columns={columns}
               bordered
               size="small"
               tableLayout="fixed"
               loading={loading}
               rowKey={nameof(previewModel.id)}
               pagination={pagination}
               rowSelection={rowSelection}
               onChange={handleTableChange}
               title={() => (<>
                 <div className="d-flex justify-content-between">
                   <div className="flex-shrink-1 d-flex align-items-center">
                     <button className="btn btn-primary mr-2" onClick={handleGoCreate}>
                       <i className="fa mr-2 fa-plus"/>
                       {translate(generalLanguageKeys.actions.create)}
                     </button>
                     {/* TODO: add batch delete handler */}
                     <button className="btn btn-danger mr-2" disabled={!hasSelected}>
                       <i className="fa mr-2 fa-trash"/>
                       {translate(generalLanguageKeys.actions.delete)}
                     </button>
                     {/* TODO: add import handler */}
                     <button className="btn btn-outline-primary mr-2">
                       <i className="fa mr-2 fa-upload"/>
                       {translate(generalLanguageKeys.actions.import)}
                     </button>
                     {/* TODO: add export handler */}
                     <button className="btn btn-outline-primary mr-2">
                       <i className="fa mr-2 fa-download"/>
                       {translate(generalLanguageKeys.actions.export)}
                     </button>
                   </div>
                   <div className="flex-shrink-1 d-flex align-items-center">
                     {translate('general.master.pagination', {pageSize: pagination.pageSize, total})}
                   </div>
                 </div>
               </>)}
        />
        <MasterPreview isOpen={previewVisible} onClose={handleClosePreview} size="xl">
          <Descriptions title={previewModel.name} bordered>
            <Descriptions.Item label={translate('provinces.id')}>
              {previewModel.id}
            </Descriptions.Item>
            <Descriptions.Item label={translate('provinces.code')}>
              {previewModel.code}
            </Descriptions.Item>
            <Descriptions.Item label={translate('provinces.name')}>
              {previewModel.name}
            </Descriptions.Item>
          </Descriptions>
        </MasterPreview>
      </Card>
    </div>
  );
}

export default ProvinceMaster;
