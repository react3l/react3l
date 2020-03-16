import React from 'react';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import {generalLanguageKeys} from 'config/consts';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import Tree from './Tree';
import {sampleTree} from 'sample';

export default {
  title: nameof(Tree),
};

export function Default() {
  const [translate] = useTranslation();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<any>(null);

  const handleToggle = React.useCallback(
    () => {
      setVisible(false);
      setCurrentItem(null);
    },
    [],
  );

  const handleAdd = React.useCallback(
    (node: any) => {
      return () => {
        setCurrentItem(node);
        setVisible(true);
      };
    },
    [],
  );

  const handleEdit = React.useCallback(
    (node: any) => {
      return () => {
        setCurrentItem(node);
        setVisible(true);
      };
    },
    [],
  );

  return (
    <>
      <div className="d-flex justify-content-end">
        <button className="btn btn-sm btn-primary" onClick={handleAdd(null)}>
          {translate(generalLanguageKeys.actions.add)}
        </button>
      </div>
      <Tree tree={sampleTree}
            onAdd={handleAdd}
            onEdit={handleEdit}
      />
      <Modal isOpen={visible}
             toggle={handleToggle}
      >
        <ModalHeader>
          {currentItem === null ? translate('tree.actions.addNode') : translate('tree.actions.addSubNode', currentItem)}
        </ModalHeader>
        <ModalBody>

        </ModalBody>
        <ModalFooter>
          <button className="btn btn-sm btn-primary">
            {translate(generalLanguageKeys.actions.save)}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
