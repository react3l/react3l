import {Model} from 'core/models';
import React from 'react';
import {useParams} from 'react-router';

type UseDetailResult<T extends Model> = [
  T,
  (t: T) => void,
  boolean
];

/**
 * Handling a detail page
 *
 * @param getDetail (id?: number | string) => Promise<T>
 * @return          UseDetailResult<T>
 */
export function useDetail<T extends Model>(getDetail?: (id?: number | string) => Promise<T>): UseDetailResult<T> {
  const [t, setT] = React.useState<T>(new Model() as T);
  const {id} = useParams();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(
    () => {
      if (getDetail) {
        setLoading(true);
        getDetail(id)
          .then((t: T) => {
            setT(t);
          })
          .finally(() => {
            setLoading(true);
          });
      }
    },
    [getDetail, id],
  );

  return [t, setT, loading];
}
