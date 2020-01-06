import {DETAIL_KEYS} from 'config/consts';
import {join} from 'path';
import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import {Model} from '../models';

export type DetailHookResult<T extends Model> = [
  T,
  (t: T) => void,
  boolean,
  (loading: boolean) => void,
  boolean,
  () => void,
  () => void,
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
 * @returns {DetailHookResult<T>}
 */
export function useDetail<T extends Model>(
  baseRoute: string,
  getDetail?: (t?: T) => Promise<T>,
  saveDetail?: (t?: T) => Promise<T>,
  onSavingError?: (error: Error) => void,
): DetailHookResult<T> {
  const [t, setT] = React.useState<T>(new Model() as T);
  const {id} = useParams<DetailParams>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const isDetail: boolean = id !== nameof(DETAIL_KEYS.add);
  const history = useHistory();

  const handleGoBack = React.useCallback(
    () => {
      history.push(join(baseRoute));
    },
    [baseRoute, history],
  );

  const handleSave = React.useCallback(
    async () => {
      setLoading(true);
      try {
        const newT: T = await saveDetail(t);
        if (t?.id) {
          setT(newT);
        } else {
          history.push(join(baseRoute, newT.id));
        }
      } catch (error) {
        if (onSavingError) {
          onSavingError(error);
        }
      }
      setLoading(false);
    },
    [baseRoute, history, onSavingError, saveDetail, t],
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

  return [t, setT, loading, setLoading, isDetail, handleGoBack, handleSave];
}
