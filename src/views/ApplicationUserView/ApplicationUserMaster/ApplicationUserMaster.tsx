import Card from 'antd/lib/card';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
import Table, {ColumnProps} from 'antd/lib/table';
import {Col, Row} from 'antd/lib/grid';
import Descriptions from 'antd/lib/descriptions';
import {crudService, routerService} from 'core/services';
import {getOrderTypeForTable, renderMasterIndex} from 'helpers/ant-design/table';
import {ApplicationUser} from 'models/ApplicationUser';
import {ApplicationUserFilter} from 'models/ApplicationUserFilter';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import './ApplicationUserMaster.scss';
import {applicationUserRepository} from 'views/ApplicationUserView/ApplicationUserRepository';
import {tableService} from 'services';
import {generalColumnWidths, generalLanguageKeys} from 'config/consts';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {ApplicationUserType} from 'models/ApplicationUserType';
import {API_PROVINCE_ROUTE} from 'config/api-consts';
import {ApplicationUserTypeFilter} from 'models/ApplicationUserTypeFilter';
import {formItemLayout} from 'config/ant-design/form';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';
import AdvancedIdFilter from 'components/AdvancedIdFilter/AdvancedIdFilter';
import MasterPreview from 'components/MasterPreview/MasterPreview';
import AdvancedDateFilter from 'components/AdvancedDateFilter/AdvancedDateFilter';

const {Item: FormItem} = Form;

function ApplicationUserMaster() {
  const [translate] = useTranslation();

  const [
    filter,
    setFilter,
    list,
    setList,
    loading,
    setLoading,
    total,
    previewLoading,
    previewVisible,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
    handleFilter,
    handleSearch,
    handleReset,
  ] = crudService.useMaster<ApplicationUser, ApplicationUserFilter>(
    ApplicationUser,
    ApplicationUserFilter,
    applicationUserRepository.count,
    applicationUserRepository.list,
    applicationUserRepository.get,
  );
  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(PROVINCE_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total);
  const [rowSelection, hasSelected] = tableService.useRowSelection<ApplicationUser>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    applicationUserRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_PROVINCE_ROUTE);

  /**
   * Call hook for all enum lists here
   */
  const [applicationUserTypes] = crudService.useEnumList<ApplicationUserType>(applicationUserRepository.singleListApplicationUserType);

  /**
   * Define filter for reference searching
   */
  const [applicationUserTypeFilter, setApplicationUserTypeFilter] = React.useState<ApplicationUserTypeFilter>(new ApplicationUserTypeFilter());

  /**
   * Delete handlers
   */
  const [handleDelete] = tableService.useDeleteHandler<ApplicationUser>(
    applicationUserRepository.delete,
    setLoading,
    list,
    setList,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    applicationUserRepository.bulkDelete,
    setLoading,
  );

  const columns: ColumnProps<ApplicationUser>[] = React.useMemo(() => [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<ApplicationUser>(pagination),
      },
      {
        title: translate('applicationUsers.id'),
        key: nameof(list[0].id),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(list[0].id), sorter),
        dataIndex: nameof(list[0].id),
      },
      {
        title: translate('applicationUsers.name'),
        key: nameof(list[0].name),
        dataIndex: nameof(list[0].name),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(list[0].name), sorter),
      },
      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.columns.actions),
        dataIndex: nameof(list[0].id),
        width: generalColumnWidths.actions,
        align: 'center',
        render(id: number, applicationUser: ApplicationUser) {
          return (
            <div className="d-flex justify-content-center">
              <button className="btn btn-sm btn-link text-warning" onClick={handleOpenPreview(id)}>
                <i className="fa fa-eye"/>
              </button>
              <button className="btn btn-sm btn-link" onClick={handleGoDetail(id)}>
                <i className="fa fa-edit"/>
              </button>
              <button className="btn btn-sm btn-link text-danger" onClick={handleDelete(applicationUser)}>
                <i className="fa fa-trash"/>
              </button>
            </div>
          );
        },
      },
    ],
    [handleDelete, handleGoDetail, handleOpenPreview, list, pagination, sorter, translate],
  );

  return (
    <div className="page master-page">
      <Card title={translate('applicationUsers.master.title')}>
        <Card className="filter-card mb-4" title={translate(generalLanguageKeys.actions.search)}>
          <Form {...formItemLayout}>
            <Row>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('applicationUsers.id')}>
                  <AdvancedStringFilter filterType={nameof(filter.id.equal)}
                                        filter={filter.id}
                                        onChange={handleFilter(nameof(previewModel.id))}
                                        className="w-100"/>
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('applicationUsers.applicationUserType')}>
                  <AdvancedIdFilter filter={filter.applicationUserTypeId}
                                    filterType={nameof(filter.applicationUserTypeId.equal)}
                                    setModelFilter={setFilter}
                                    value={filter.applicationUserTypeId.equal}
                                    onChange={handleFilter(nameof(filter.applicationUserTypeId))}
                                    list={applicationUserTypes}
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('applicationUsers.applicationUserType')}>
                  <AdvancedIdFilter filter={filter.applicationUserTypeId}
                                    filterType={nameof(filter.applicationUserTypeId.equal)}
                                    value={filter.applicationUserTypeId.equal}
                                    onChange={handleFilter(nameof(filter.applicationUserTypeId))}
                                    getList={applicationUserRepository.singleListApplicationUserType}
                                    modelFilter={applicationUserTypeFilter}
                                    setModelFilter={setApplicationUserTypeFilter}
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('applicationUsers.name')}>
                  <AdvancedStringFilter filterType={nameof(filter.name.startWith)}
                                        filter={filter.name}
                                        onChange={handleFilter(nameof(previewModel.name))}
                                        className="w-100"/>
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('applicationUsers.name')}>
                  <AdvancedStringFilter filterType={nameof(filter.name.startWith)}
                                        filter={filter.name}
                                        onChange={handleFilter(nameof(previewModel.name))}
                                        className="w-100"/>
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('applicationUsers.createdAt')}>
                  <AdvancedDateFilter filterType={nameof(filter.createdAt.equal)}
                                      filter={filter.createdAt}
                                      onChange={handleFilter(nameof(previewModel.createdAt))}
                                      className="w-100"/>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div className="d-flex justify-content-end mt-2">
            <button className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
              {translate(generalLanguageKeys.actions.filter)}
            </button>
            <button className="btn btn-sm btn-outline-secondary text-dark" onClick={handleReset}>
              <i className="fa mr-2 fa-times"/>
              {translate(generalLanguageKeys.actions.reset)}
            </button>
          </div>
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
               title={() => (
                 <>
                   <div className="d-flex justify-content-between">
                     <div className="flex-shrink-1 d-flex align-items-center">
                       <button className="btn btn-sm btn-primary mr-2" onClick={handleGoCreate}>
                         <i className="fa mr-2 fa-plus"/>
                         {translate(generalLanguageKeys.actions.create)}
                       </button>
                       <button className="btn btn-sm btn-danger mr-2" disabled={!hasSelected}
                               onClick={handleBulkDelete}>
                         <i className="fa mr-2 fa-trash"/>
                         {translate(generalLanguageKeys.actions.delete)}
                       </button>
                       <label className="btn btn-sm btn-outline-primary mr-2 mb-0" htmlFor="master-import">
                         <i className="fa mr-2 fa-upload"/>
                         {translate(generalLanguageKeys.actions.import)}
                       </label>
                       <button className="btn btn-sm btn-outline-primary mr-2" onClick={handleExport}>
                         <i className="fa mr-2 fa-download"/>
                         {translate(generalLanguageKeys.actions.export)}
                       </button>
                     </div>
                     <div className="flex-shrink-1 d-flex align-items-center">
                       {translate('general.master.pagination', {pageSize: pagination.pageSize, total})}
                     </div>
                   </div>
                 </>
               )}
        />
        <input type="file" className="hidden" id="master-import" onChange={handleImport}/>
        <MasterPreview isOpen={previewVisible} onClose={handleClosePreview} size="xl">
          <Spin spinning={previewLoading}>
            <Descriptions title={previewModel.name} bordered>
              <Descriptions.Item label={translate('applicationUsers.id')}>
                {previewModel.id}
              </Descriptions.Item>
              <Descriptions.Item label={translate('applicationUsers.applicationUserType')}>
                {previewModel.applicationUserType?.name}
              </Descriptions.Item>
              <Descriptions.Item label={translate('applicationUsers.code')}>
                {previewModel.code}
              </Descriptions.Item>
              <Descriptions.Item label={translate('applicationUsers.name')}>
                {previewModel.name}
              </Descriptions.Item>
            </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
    </div>
  );
}

export default ApplicationUserMaster;
