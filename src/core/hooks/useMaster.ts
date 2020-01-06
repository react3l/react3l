import {DETAIL_KEYS} from 'config/consts';
import {Filter} from 'core/filters';
import {join} from 'path';
import React from 'react';
import {useHistory} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import {Model, Search} from '../models';

export type MasterHookResult<T extends Model> = [
  T[],
  number,
  boolean,
  (loading: boolean) => void,
  () => void,
  () => void,
  (id: number) => () => void,
  (field: string) => (filter: Filter) => void,
];

/**
 *
 * @param {string} baseRoute
 * @param {(tSearch?: TSearch) => Promise<T[]>} masterList
 * @param {(tSearch?: TSearch) => Promise<number>} masterCount
 * @param {TSearch} search
 * @param {(search: TSearch) => void} setSearch
 * @returns {MasterHookResult<T, TSearch>}
 */
export function useMaster<T extends Model, TSearch extends Search>(
  baseRoute: string,
  masterList: (tSearch?: TSearch) => Promise<T[]>,
  masterCount: (tSearch?: TSearch) => Promise<number>,
  search: TSearch,
  setSearch: (search: TSearch) => void,
): MasterHookResult<T> {
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
      setSearch(Search.clone<TSearch>());
    },
    [setSearch],
  );

  const handleFilter = React.useCallback(
    (field: string) => {
      return (filter: Filter) => {
        setSearch(Search.clone<TSearch>({
          ...search,
          [field]: filter,
        }));
      };
    },
    [search, setSearch],
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
    loading,
    setLoading,
    handleAdd,
    handleReset,
    handleEdit,
    handleFilter,
  ];
}
