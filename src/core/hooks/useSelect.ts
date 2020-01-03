import {debounce} from 'core/helpers';
import {Model, Search} from 'core/models';
import React from 'react';

type SelectHookResult<T extends Model> = [
  T[],
  () => Promise<void>,
  boolean,
  () => (value: string) => void,
];

export function useSelect<T extends Model, TSearch extends Search = Search>(
  defaultList: T[],
  getList?: (tSearch?: TSearch) => Promise<T[]>,
  search?: TSearch,
  setSearch?: (search: TSearch) => void,
  searchField?: string,
  handleError?: (error: Error) => void,
): SelectHookResult<T> {
  const [list, setList] = React.useState<T[]>(defaultList || []);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(
    () => {
      if (defaultList) {
        setList(defaultList);
      }
    },
    [defaultList],
  );

  const handleLoadList = React.useCallback(
    async () => {
      setLoading(true);
      getList(search)
        .then((list: T[]) => {
          setList(list);
        })
        .catch(handleError)
        .finally(() => {
          setLoading(false);
        });
    },
    [getList, handleError, search],
  );

  React.useEffect(
    () => {
      if (getList) {
        handleLoadList();
      }
    },
    [getList, handleLoadList],
  );

  const handleSearch = React.useMemo(
    () => debounce((value: string) => {
      setSearch(Search.clone<TSearch>({
        ...search,
        [searchField]: value,
      }));
    }),
    [search, searchField, setSearch],
  );

  return [list, handleLoadList, loading, handleSearch];
}
