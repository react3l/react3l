import classNames from 'classnames';
import {translate} from 'core/helpers/internationalization';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Modal, {ModalProps} from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import './MasterPreview.scss';

export interface MasterPreviewProps extends ModalProps {
  children?: any;

  title?: string;

  className?: string;

  onClose?(): void;
}

function MasterPreview(props: MasterPreviewProps) {
  const [translate] = useTranslation();
  const {
    title,
    children,
    className,
    onClose,
    ...restProps
  } = props;

  return (
    <Modal {...restProps}
           className={classNames('master-preview', className)}
           unmountOnClose={true}>
      <ModalHeader title={translate(title)}>
        {translate(title)}
      </ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={onClose}>
          {translate('general.actions.close')}
        </button>
      </ModalFooter>
    </Modal>
  );
}

MasterPreview.defaultProps = {
  title: translate('general.master.defaultPreviewTitle'),
};

export default MasterPreview;
