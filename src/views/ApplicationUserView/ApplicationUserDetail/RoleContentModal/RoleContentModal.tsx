import React from 'react';
import './RoleContentModal.scss';
import Modal, {ModalProps} from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Table, {ColumnProps} from 'antd/lib/table';
import {Role} from 'models/Role';
import {generalLanguageKeys} from 'config/consts';
import {useTranslation} from 'react-i18next';

export interface RoleContentModalProps extends ModalProps {
  title: string;
}

function RoleContentModal(props: RoleContentModalProps) {
  const [translate] = useTranslation();

  const {
    toggle,
    isOpen,
    title,
  } = props;

  const columns: ColumnProps<Role>[] = React.useMemo(
    () => {
      return [];
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        {title}
      </ModalHeader>
      <ModalBody>
        <Table tableLayout="fixed"
               bordered={true}
               columns={columns}
        />
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-sm btn-primary">
          {translate(generalLanguageKeys.actions.add)}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default RoleContentModal;
