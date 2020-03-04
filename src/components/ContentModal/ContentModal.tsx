import React, {Dispatch, SetStateAction} from 'react';
import './ContentModal.scss';
import Modal, {ModalProps} from 'reactstrap/lib/Modal';
import {Model} from 'core/models';
import {useTranslation} from 'react-i18next';
import Table, {ColumnProps, TableRowSelection} from 'antd/lib/table';
import {Role} from 'models/Role';
import {crudService} from 'core/services';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import Card from 'antd/lib/card';
import {generalLanguageKeys} from 'config/consts';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import {PaginationConfig} from 'antd/lib/pagination';

export interface ContentModalProps<T extends Model> extends ModalProps {
  title: string;

  selectedList: T[];

  setSelectedList: Dispatch<SetStateAction<T[]>>;

  list: T[];

  loading: boolean;

  pagination?: PaginationConfig;

  columns?: ColumnProps<T>[];

  children?: any;
}

function ContentModal<T extends Model>(props: ContentModalProps<T>) {
  const [translate] = useTranslation();

  const {
    toggle,
    onClose,
    isOpen,
    title,
    loading,
    list,
    selectedList,
    setSelectedList,
    columns,
    children,
    pagination,
  } = props;

  const rowSelection: TableRowSelection<Role> = crudService.useContentModalList<T>(selectedList, setSelectedList);

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
          {children}
        </Card>
        <Table tableLayout="fixed"
               bordered={true}
               columns={columns}
               dataSource={list}
               loading={loading}
               rowSelection={rowSelection}
               pagination={pagination}
        />
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-sm btn-default" onClick={onClose}>
          {translate(generalLanguageKeys.actions.close)}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default ContentModal;
