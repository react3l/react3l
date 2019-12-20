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
  confirmTitle: string = DEFAULT_TITLE_MESSAGE,
  confirmContent: string = DEFAULT_CONTENT_MESSAGE,
  successMessage: string = DEFAULT_SUCCESS_MESSAGE,
  failureMessage: string = DEFAULT_FAILURE_MESSAGE,
  onSuccess?: (t?: T) => void,
  onError?: (error: Error) => void,
  onCancel?: () => void,
) {
  const [translate] = useTranslation();
  return React.useCallback(
    (t: T) => {
      return () => {
        Modal.confirm({
          title: translate(confirmTitle, t),
          content: translate(confirmContent, t),
          okType: 'danger',
          onOk: () => {
            onSetLoading(true);
            onDelete(t)
              .then(() => {
                message.info(translate(successMessage, t));
                if (typeof onSuccess === 'function') {
                  onSuccess();
                }
              })
              .catch((error: Error) => {
                message.error(translate(failureMessage, {error, ...t}));
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
    [translate, confirmTitle, confirmContent, onCancel, onSetLoading, onDelete, successMessage, onSuccess, failureMessage, onError],
  );
}
