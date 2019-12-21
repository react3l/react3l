import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import {translate} from 'core/helpers';
import {Model} from 'core/models';
import {useTranslation} from 'react-i18next';
import React from 'reactn';

const DEFAULT_SUCCESS_MESSAGE: string = translate('general.delete.success');
const DEFAULT_FAILURE_MESSAGE: string = translate('general.delete.failure');
const DEFAULT_TITLE_MESSAGE: string = translate('general.delete.title');
const DEFAULT_CONTENT_MESSAGE: string = translate('general.delete.content');

export function useDeleteHandler<T extends Model>(
  onDelete: (t: T) => Promise<T>,
  onSetLoading: (loading: boolean) => void,
  onSuccess?: (t?: T) => void,
  onError?: (error: Error) => void,
  onCancel?: () => void,
) {
  const [translate] = useTranslation();
  return React.useCallback(
    (t: T) => {
      return () => {
        Modal.confirm({
          title: translate(DEFAULT_TITLE_MESSAGE, t),
          content: translate(DEFAULT_CONTENT_MESSAGE, t),
          okType: 'danger',
          onOk: () => {
            onSetLoading(true);
            onDelete(t)
              .then(() => {
                message.info(translate(DEFAULT_SUCCESS_MESSAGE, t));
                if (typeof onSuccess === 'function') {
                  onSuccess();
                }
              })
              .catch((error: Error) => {
                message.error(translate(DEFAULT_FAILURE_MESSAGE, {error, ...t}));
                if (typeof onError === 'function') {
                  onError(error);
                }
              })
              .finally(
                () => {
                  onSetLoading(false);
                },
              );
          },
          onCancel,
        });
      };
    },
    // tslint:disable-next-line:max-line-length
    [onCancel, onDelete, onError, onSetLoading, onSuccess, translate],
  );
}
