import {DETAIL_KEYS} from 'config/consts';
import {join} from 'path';
import React from 'react';
import {useHistory} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import {Model, Search} from '../models';

export type MasterHookResult<T extends Model, TSearch extends Search> = [
  T[],
  number,
  TSearch,
  (tSearch: TSearch) => void,
  boolean,
  (loading: boolean) => void,
  () => void,
  () => void,
  (id: number) => () => void,
];

/**
 * Handle a master page
 * @param {string} baseRoute
 * @param {(tSearch?: TSearch) => Promise<T[]>} masterList
 * @param {(tSearch?: TSearch) => Promise<number>} masterCount
 * @returns {MasterHookResult<T, TSearch>}
 */
export function useMaster<T extends Model, TSearch extends Search>(
  baseRoute: string,
  masterList: (tSearch?: TSearch) => Promise<T[]>,
  masterCount: (tSearch?: TSearch) => Promise<number>,
): MasterHookResult<T, TSearch> {
  const [search, setSearch] = React.useState<TSearch>(new Search() as TSearch);
  const [list, setList] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [total, setTotal] = React.useState<number>(0);
  const history = useHistory();

  const handleAdd = React.useCallback(
    () => {
      history.push(join(baseRoute, nameof(DETAIL_KEYS.add)));
    },
    [history, baseRoute],
  );

  const handleEdit = React.useCallback(
    (id: number) => {
      return () => {
        history.push(join(baseRoute, id.toString()));
      };
    },
    [baseRoute, history],
  );

  const handleReset = React.useCallback(
    () => {
      setSearch(new Search() as TSearch);
    },
    [setSearch],
  );

  React.useEffect(
    () => {
      setLoading(true);
      Promise.all([
        masterList(search),
        masterCount(search),
      ])
        .then(([list, total]: [T[], number]) => {
          setList(list);
          setTotal(total);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [masterCount, masterList, search],
  );

  return [
    list,
    total,
    search,
    setSearch,
    loading,
    setLoading,
    handleAdd,
    handleReset,
    handleEdit,
  ];
}
