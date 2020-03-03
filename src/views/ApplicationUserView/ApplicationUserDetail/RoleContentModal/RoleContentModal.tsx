import React, {Dispatch, SetStateAction} from 'react';
import './RoleContentModal.scss';
import Modal, {ModalProps} from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Table, {ColumnProps} from 'antd/lib/table';
import {Role} from 'models/Role';
import {generalLanguageKeys} from 'config/consts';
import {useTranslation} from 'react-i18next';
import {RoleFilter} from 'models/RoleFilter';
import nameof from 'ts-nameof.macro';
import {tableService} from 'services';
import Form from 'antd/lib/form';
import {formItemLayout} from 'config/ant-design/form';
import {Col, Row} from 'antd/lib/grid';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';
import Card from 'antd/lib/card';
import {crudService} from 'core/services';

const {Item: FormItem} = Form;

export interface RoleContentModalProps extends ModalProps {
  title: string;

  loading: boolean;

  list: Role[];

  setFilter: Dispatch<SetStateAction<RoleFilter>>;

  total: number;

  filter: RoleFilter;

  defaultSelectedRowKeys: number[] | string[];

  onClose?(): void;
}

function RoleContentModal(props: RoleContentModalProps) {
  const [translate] = useTranslation();

  const {
    toggle,
    isOpen,
    title,
    list,
    loading,
    onClose,
    defaultSelectedRowKeys,
    filter,
    setFilter,
  } = props;

  const columns: ColumnProps<Role>[] = React.useMemo(
    () => {
      return [
        {
          title: translate('roles.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
        },
        {
          title: translate('roles.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
        },
      ];
    },
    [list, translate],
  );

  const [rowSelection] = tableService.useRowSelection<Role>(defaultSelectedRowKeys);

  const [
    handleChangeFilterSimpleField,
  ] = crudService.useChangeHandlers<RoleFilter>(filter, setFilter);

  return (
    <Modal size="xl"
           isOpen={isOpen}
           backdrop="static"
           toggle={toggle}
           unmountOnClose={true}>
      <ModalHeader>
        {title}
      </ModalHeader>
      <ModalBody>
        <Card className="head-borderless mb-4" title={translate(generalLanguageKeys.actions.search)}>
          <Form {...formItemLayout}>
            <Row>
              <Col className="pl-1" span={8}>
                <FormItem className="mb-0" label={translate('applicationUsers.id')}>
                  {/* Similar to master page */}
                  <AdvancedStringFilter filterType={nameof(filter.id.equal)}
                                        filter={filter.id}
                                        onChange={handleChangeFilterSimpleField(nameof(filter.id))}
                                        className="w-100"/>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Table tableLayout="fixed"
               bordered={true}
               columns={columns}
               dataSource={list}
               loading={loading}
               rowSelection={rowSelection}
        />
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-sm btn-primary">
          {translate(generalLanguageKeys.actions.add)}
        </button>
        <button className="btn btn-sm btn-default" onClick={onClose}>
          {translate(generalLanguageKeys.actions.close)}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default RoleContentModal;
