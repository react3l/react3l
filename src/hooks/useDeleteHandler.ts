import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import {AxiosError} from 'axios';
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
  model: T,
  setModel: (t: T) => void,
  onSuccess?: (t?: T) => void,
  onError?: (error: Error) => void,
  onCancel?: () => void,
) {
  const [translate] = useTranslation();
  return React.useMemo(
    () => {
      return () => {
        Modal.confirm({
          title: translate(DEFAULT_TITLE_MESSAGE, model),
          content: translate(DEFAULT_CONTENT_MESSAGE, model),
          okType: 'danger',
          onOk: () => {
            onSetLoading(true);
            onDelete(model)
              .then(() => {
                message.info(translate(DEFAULT_SUCCESS_MESSAGE, model));
                if (typeof onSuccess === 'function') {
                  onSuccess();
                }
              })
              .catch((error: AxiosError<T>) => {
                message.error(translate(DEFAULT_FAILURE_MESSAGE, {error, ...model}));
                setModel(Model.clone<T>({
                  ...model,
                  errors: error.response.data,
                }));
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
    [model, onCancel, onDelete, onError, onSetLoading, onSuccess, setModel, translate],
  );
}
