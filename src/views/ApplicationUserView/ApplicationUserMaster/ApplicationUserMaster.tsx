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
import {APPLICATION_USER_ROUTE} from 'config/route-consts';
import {API_PROVINCE_ROUTE} from 'config/api-consts';
import {formItemLayout} from 'config/ant-design/form';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';
import AdvancedIdFilter from 'components/AdvancedIdFilter/AdvancedIdFilter';
import MasterPreview from 'components/MasterPreview/MasterPreview';
import {UserStatus} from 'models/UserStatus';
import {Provider} from 'models/Provider';
import CollapsibleCard from 'components/CollapsibleCard/CollapsibleCard';

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
  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(APPLICATION_USER_ROUTE);
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
  const [userStatusList] = crudService.useEnumList<UserStatus>(applicationUserRepository.singleListUserStatus);

  /**
   * Define filter for reference searching
   */

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
        title: translate('applicationUsers.username'),
        key: nameof(list[0].username),
        dataIndex: nameof(list[0].username),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(list[0].username), sorter),
      },
      {
        title: translate('applicationUsers.displayName'),
        key: nameof(list[0].displayName),
        dataIndex: nameof(list[0].displayName),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(list[0].displayName), sorter),
      },
      {
        title: translate('applicationUsers.provider'),
        key: nameof(list[0].provider),
        dataIndex: nameof(list[0].provider),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(list[0].provider), sorter),
        render(provider: Provider) {
          return provider?.name;
        },
      },
      {
        title: translate('applicationUsers.email'),
        key: nameof(list[0].email),
        dataIndex: nameof(list[0].email),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(list[0].email), sorter),
      },
      {
        title: translate('applicationUsers.phone'),
        key: nameof(list[0].phone),
        dataIndex: nameof(list[0].phone),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(list[0].phone), sorter),
      },
      {
        title: translate('applicationUsers.userStatus'),
        key: nameof(list[0].userStatus),
        dataIndex: nameof(list[0].userStatus),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(list[0].userStatus), sorter),
        render(userStatus: UserStatus) {
          return userStatus?.name;
        },
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

  const tableTitle = React.useCallback(
    () => (
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
    ),
    [handleBulkDelete, handleExport, handleGoCreate, hasSelected, pagination.pageSize, total, translate],
  );

  return (
    <div className="page master-page">
      <Card title={translate('applicationUsers.master.title')}>
        <CollapsibleCard title={translate(generalLanguageKeys.actions.search)} className="mb-4">
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
                <FormItem className="mb-0" label={translate('applicationUsers.userStatus')}>
                  <AdvancedIdFilter filter={filter.userStatusId}
                                    filterType={nameof(filter.userStatusId.equal)}
                                    setModelFilter={setFilter}
                                    value={filter.userStatusId.equal}
                                    onChange={handleFilter(nameof(filter.userStatusId))}
                                    list={userStatusList}
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('applicationUsers.applicationUserType')}>

                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('applicationUsers.name')}>
                  <AdvancedStringFilter filterType={nameof(filter.username.startWith)}
                                        filter={filter.username}
                                        onChange={handleFilter(nameof(previewModel.username))}
                                        className="w-100"/>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div className="d-flex justify-content-end mt-2">
            <button className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
              <i className="fa fa-search mr-2"/>
              {translate(generalLanguageKeys.actions.filter)}
            </button>
            <button className="btn btn-sm btn-outline-secondary text-dark" onClick={handleReset}>
              <i className="fa mr-2 fa-times"/>
              {translate(generalLanguageKeys.actions.reset)}
            </button>
          </div>
        </CollapsibleCard>
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
               title={tableTitle}
        />
        <input type="file" className="hidden" id="master-import" onChange={handleImport}/>
        <MasterPreview isOpen={previewVisible} onClose={handleClosePreview} size="xl">
          <Spin spinning={previewLoading}>
            <Descriptions title={previewModel.name} bordered>
              <Descriptions.Item label={translate('applicationUsers.id')}>
                {previewModel?.id}
              </Descriptions.Item>
              <Descriptions.Item label={translate('applicationUsers.userStatus')}>
                {previewModel?.userStatus?.name}
              </Descriptions.Item>
              <Descriptions.Item label={translate('applicationUsers.username')}>
                {previewModel?.username}
              </Descriptions.Item>
              <Descriptions.Item label={translate('applicationUsers.displayName')}>
                {previewModel?.displayName}
              </Descriptions.Item>
            </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
    </div>
  );
}

export default ApplicationUserMaster;
