import {Model} from 'core/models';
import React from 'react';
import {useParams} from 'react-router';

type UseDetailResult<T extends Model> = [
  T,
  (t: T) => void,
  boolean
];

interface DetailParams {
  id?: string;
}

/**
 * Handling a detail page
 *
 * @param getDetail (id?: number | string) => Promise<T>
 * @return          UseDetailResult<T>
 */
export function useDetail<T extends Model>(getDetail?: (t?: Model) => Promise<T>): UseDetailResult<T> {
  const [t, setT] = React.useState<T>(new Model() as T);
  const {id} = useParams<DetailParams>();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(
    () => {
      if (!!getDetail && id !== 'add') {
        setLoading(true);
        const t: T = Model.clone<Model>({
          id,
        }) as T;
        getDetail(t)
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
