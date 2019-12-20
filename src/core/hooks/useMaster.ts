import {DETAIL_KEYS} from 'config/consts';
import {debounce} from 'core/helpers';
import {Model, Search} from 'core/models';
import {join} from 'path';
import React from 'react';
import {useHistory} from 'react-router-dom';
import nameof from 'ts-nameof.macro';

type UseMasterResult<T extends Model, TSearch extends Search> = [
  T[],
  number,
  TSearch,
  (tSearch: TSearch) => void,
  boolean,
  (loading: boolean) => void,
  () => void,
  () => void,
  (id: number) => () => void,
  (field: string) => (event?: ChangeEvent | PrimitiveValue | PrimitiveValue[]) => void,
  (field: string) => (value?: number, model?: T) => void,
];

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

type PrimitiveValue = number | string | boolean | null | undefined;

/**
 * Handle a master page
 * @param {string} baseRoute
 * @param {(tSearch?: TSearch) => Promise<T[]>} masterList
 * @param {(tSearch?: TSearch) => Promise<number>} masterCount
 * @returns {UseMasterResult<T, TSearch>}
 */
export function useMaster<T extends Model, TSearch extends Search>(
  baseRoute: string,
  masterList: (tSearch?: TSearch) => Promise<T[]>,
  masterCount: (tSearch?: TSearch) => Promise<number>,
): UseMasterResult<T, TSearch> {
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
    [history, baseRoute],
  );

  const handleSetInputValue = React.useCallback(
    (field: string, value?: string | number | null) => {
      setSearch(Search.clone<TSearch>({
        ...search,
        [field]: value,
        skip: 0,
      }));
    },
    [search, setSearch],
  );

  const handleDebounceInputValue = React.useCallback(
    debounce(handleSetInputValue),
    [handleSetInputValue],
  );

  const handleFilter = React.useCallback(
    (field: string, debounce: boolean = true) => {
      return (event) => {
        if (event && typeof event === 'object') {
          if (event.target) {
            if (debounce) {
              return handleDebounceInputValue(field, event.target.value);
            }
            return handleSetInputValue(field, event.target.value);
          }
        }
        if (typeof event === 'string' || typeof event === 'number') {
          if (debounce) {
            return handleDebounceInputValue(field, event);
          }
          return handleSetInputValue(field, event);
        }
      };
    },
    [handleDebounceInputValue, handleSetInputValue],
  );

  const handleObjectFilter = React.useCallback(
    <T extends Model>(field: string) => {
      return (id?: number | string | null, t?: T) => {
        setSearch(Search.clone<TSearch>({
          ...search,
          [field]: t,
          [`${field}Id`]: id,
          skip: 0,
        }));
      };
    },
    [search, setSearch],
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
    [masterList, masterCount, search, setList, setLoading],
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
    handleFilter,
    handleObjectFilter,
  ];
}
