import {Model, Search} from 'core/models';
import React from 'react';

type UseMasterResult<T extends Model, TSearch extends Search> = [
  T[],
  (list: T[]) => void,
  TSearch,
  (tSearch: TSearch) => void,
  boolean
];

/**
 * Handling a master page
 *
 * @param getList (tSearch?: TSearch) => Promise<T[]>
 */
export function useMaster<T extends Model, TSearch extends Search>(
  getList: (tSearch?: TSearch) => Promise<T[]>,
): UseMasterResult<T, TSearch> {
  const [search, setSearch] = React.useState<TSearch>(new Search() as TSearch);
  const [list, setList] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(
    () => {
      setLoading(true);
      getList(search)
        .then((list: T[]) => {
          setList(list);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [search, getList, setList, setLoading],
  );

  return [list, setList, search, setSearch, loading];
}
