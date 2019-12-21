import Button from 'antd/lib/button';
import {translate} from 'core/helpers';
import {Model} from 'core/models';
import React from 'react';
import {useTranslation} from 'react-i18next';
import './MasterTableActions.scss';

const DEFAULT_EDIT_TITLE: string = translate('general.actions.edit');
const DEFAULT_DELETE_TITLE: string = translate('general.actions.delete');

interface MasterTableActionsProps<T extends Model> {
  id: number;

  model: T;

  onEdit?: (id: number) => () => void;

  editText?: string;

  onDelete?: (t: T) => () => void;

  deleteText?: string;
}

function MasterTableActions<T extends Model>(props: MasterTableActionsProps<T>) {
  const {onDelete, onEdit, id, model, deleteText, editText} = props;
  const [translate] = useTranslation();
  return (
    <>
      <Button htmlType="button" type="link" onClick={onEdit(id)}>
        {translate(editText)}
      </Button>
      <Button htmlType="button" type="link" onClick={onDelete(model)}>
        {translate(deleteText)}
      </Button>
    </>
  );
}

MasterTableActions.defaultProps = {
  editText: DEFAULT_EDIT_TITLE,
  deleteText: DEFAULT_DELETE_TITLE,
};

export default MasterTableActions;
