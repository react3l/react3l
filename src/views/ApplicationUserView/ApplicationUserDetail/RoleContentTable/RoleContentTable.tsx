import React from 'react';
import './RoleContentTable.scss';
import {ContentTableProps} from 'react3l';
import {ApplicationUser} from 'models/ApplicationUser';
import {Role} from 'models/Role';
import {crudService, formService} from 'core/services';
import Table, {ColumnProps} from 'antd/lib/table';
import {tableService} from 'services';
import {RoleFilter} from 'models/RoleFilter';
import {getOrderTypeForTable, renderMasterIndex} from 'helpers/ant-design/table';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import {generalColumnWidths, generalLanguageKeys} from 'config/consts';
import Form from 'antd/lib/form';
import {formItemLayout} from 'config/ant-design/form';
import {Col, Row} from 'antd/lib/grid';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';
import CollapsibleCard from 'components/CollapsibleCard/CollapsibleCard';
import RoleContentModal from 'views/ApplicationUserView/ApplicationUserDetail/RoleContentModal/RoleContentModal';
import {applicationUserRepository} from 'views/ApplicationUserView/ApplicationUserRepository';

const {Item: FormItem} = Form;

function RoleContentTable(props: ContentTableProps<ApplicationUser, Role>) {
  const [translate] = useTranslation();

  const {
    model,
    setModel,
  } = props;

  const [
    roles,
    setRoles,
    handleAdd,
    handleDelete,
  ] = crudService.useContentTable<ApplicationUser, Role>(
    model,
    setModel,
    nameof(model.roles),
  );

  const [
    loading,
    visible,
    list,
    total,
    handleOpen,
    handleClose,
    roleFilter,
    setRoleFilter,
  ] = crudService.useContentModal(
    applicationUserRepository.listRole,
    applicationUserRepository.countRole,
    RoleFilter,
  );

  const [
    dataSource,
    pagination,
    sorter,
    handleTableChange,
    handleFilter,
    handleSearch,
    handleReset,
  ] = tableService.useLocalTable(
    roles,
    roleFilter,
    setRoleFilter,
  );

  const columns: ColumnProps<Role>[] = React.useMemo(
    () => [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.columns.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<Role>(pagination),
      },
      {
        title: translate('roles.id'),
        key: nameof(dataSource[0].id),
        dataIndex: nameof(dataSource[0].id),
        render: renderMasterIndex<Role>(pagination),
      },
      {
        title: translate('roles.name'),
        key: nameof(dataSource[0].name),
        dataIndex: nameof(dataSource[0].name),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(dataSource[0].name), sorter),
        render(name: string, role: Role) {
          return (
            <FormItem validateStatus={formService.getValidationStatus<Role>(role.errors, nameof(role.name))}
                      help={role.errors?.name}
            >
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(name)}
                     defaultValue={name}
              />
            </FormItem>
          );
        },
      },
      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.actions),
        width: generalColumnWidths.actions,
        align: 'center',
        render(...params: [Role, Role, number]) {
          return (
            <>
              <button className="btn btn-link mr-2" onClick={handleDelete(params[2])}>
                <i className="fa fa-trash text-danger"/>
              </button>
            </>
          );
        },
      },
    ],
    [dataSource, handleDelete, pagination, sorter, translate],
  );

  const tableTitle = React.useCallback(
    () => (
      <button className="btn btn-sm btn-primary" onClick={handleOpen}>
        <i className="fa fa-plus mr-2"/>
        {translate(generalLanguageKeys.actions.add)}
      </button>
    ),
    [handleOpen, translate],
  );

  const tableFooter = React.useCallback(
    () => (
      <>
        <button className="btn btn-link" onClick={handleAdd}>
          <i className="fa fa-plus mr-2"/>
          {translate(generalLanguageKeys.actions.create)}
        </button>
      </>
    ),
    [handleAdd, translate],
  );

  return (
    <>
      <CollapsibleCard title={translate(generalLanguageKeys.actions.search)} className="mb-4">
        <RoleContentModal title={translate('applicationUsers.roleContentModal.title')}
                          selectedList={roles}
                          setSelectedList={setRoles}
                          list={list}
                          total={total}
                          isOpen={visible}
                          loading={loading}
                          toggle={handleClose}
                          onClose={handleClose}
                          filter={roleFilter}
                          setFilter={setRoleFilter}
        />
        <Form {...formItemLayout}>
          <Row>
            <Col className="pl-1" span={8}>
              <FormItem className="mb-0" label={translate('applicationUsers.id')}>
                {/* Similar to master page */}
                <AdvancedStringFilter filterType={nameof(roleFilter.id.equal)}
                                      filter={roleFilter.id}
                                      onChange={handleFilter(nameof(roleFilter.id))}
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
      <Table pagination={pagination}
             dataSource={dataSource}
             columns={columns}
             onChange={handleTableChange}
             tableLayout="fixed"
             bordered={true}
             size="small"
             title={tableTitle}
             footer={tableFooter}
      />
    </>
  );
}

export default RoleContentTable;
