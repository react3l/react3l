import message from 'antd/lib/message';
import {DETAIL_KEYS} from 'config/consts';
import {translate} from 'core/helpers';
import {Model} from 'core/models';
import {join} from 'path';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory, useParams} from 'react-router-dom';
import nameof from 'ts-nameof.macro';

const DEFAULT_SAVING_SUCCESS_MESSAGE: string = translate('general.saving.success');
const DEFAULT_SAVING_FAILURE_MESSAGE: string = translate('general.saving.failure');

export type UseDetailResult<T extends Model> = [
  T,
  (t: T) => void,
  boolean,
  boolean,
  () => void,
  (t: T) => void,
];

interface DetailParams {
  id?: string;
}

/**
 *
 * @param {string} baseRoute
 * @param {(t?: T) => Promise<T>} getDetail
 * @param {(t?: T) => Promise<T>} saveDetail
 * @param {(error: Error) => void} onSavingError
 * @param {string} successMessage
 * @param {string} failureMessage
 * @returns {UseDetailResult<T>}
 */
export function useDetail<T extends Model>(
  baseRoute: string,
  getDetail?: (t?: T) => Promise<T>,
  saveDetail?: (t?: T) => Promise<T>,
  onSavingError?: (error: Error) => void,
  successMessage: string = DEFAULT_SAVING_SUCCESS_MESSAGE,
  failureMessage: string = DEFAULT_SAVING_FAILURE_MESSAGE,
): UseDetailResult<T> {
  const [t, setT] = React.useState<T>(new Model() as T);
  const {id} = useParams<DetailParams>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const isDetail: boolean = id !== nameof(DETAIL_KEYS.add);
  const history = useHistory();
  const [translate] = useTranslation();

  const handleGoBack = React.useCallback(
    () => {
      history.push(join(baseRoute));
    },
    [history, baseRoute],
  );

  const handleSave = React.useCallback(
    async () => {
      setLoading(true);
      try {
        setT(await saveDetail(t));
        message.info(translate(successMessage, t));
      } catch (error) {
        message.error(translate(failureMessage, {error, ...t}));
        if (onSavingError) {
          onSavingError(error);
        }
      }
      setLoading(false);
    },
    [failureMessage, onSavingError, saveDetail, successMessage, t, translate],
  );

  React.useEffect(
    () => {
      if (!!getDetail && isDetail) {
        setLoading(true);
        const t: T = Model.clone<Model>({
          id,
        }) as T;
        getDetail(t)
          .then((t: T) => {
            setT(t);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [getDetail, id, isDetail],
  );

  return [t, setT, loading, isDetail, handleGoBack, handleSave];
}
