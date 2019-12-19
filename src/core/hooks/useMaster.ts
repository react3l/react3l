import {Model, Search} from 'core/models';
import React from 'react';

type UseMasterResult<T extends Model, TSearch extends Search> = [
  T[],
  number,
  TSearch,
  (tSearch: TSearch) => void,
  boolean,
  (loading: boolean) => void,
];

/**
 * Handling a master page
 *
 * @param getList (tSearch?: TSearch) => Promise<T[]>
 * @param count   (tSearch?: TSearch) => Promise<number>
 */
export function useMaster<T extends Model, TSearch extends Search>(
  getList: (tSearch?: TSearch) => Promise<T[]>,
  count: (tSearch?: TSearch) => Promise<number>,
): UseMasterResult<T, TSearch> {
  const [search, setSearch] = React.useState<TSearch>(new Search() as TSearch);
  const [list, setList] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(
    () => {
      setLoading(true);
      Promise.all([
        getList(search),
        count(search),
      ])
        .then(([list, total]: [T[], number]) => {
          setList(list);
          setTotal(total);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [getList, count, search, setList, setLoading],
  );

  return [list, total, search, setSearch, loading, setLoading];
}
