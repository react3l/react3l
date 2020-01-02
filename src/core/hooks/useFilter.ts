import React from 'react';
import {Search} from '../models';

export type FilterHookResult<TSearch extends Search, P extends keyof TSearch> = [
  TSearch[P],
  (filter: TSearch[P]) => void,
];

export function useFilter<TSearch extends Search, P extends keyof TSearch>(
  search: TSearch,
  setSearch: (search: TSearch) => void,
  field: P,
): FilterHookResult<TSearch, P> {
  const filter: TSearch[P] = search[field];

  const setFilter = React.useCallback(
    (filter: TSearch[P]) => {
      setSearch(Search.clone<TSearch>({
        ...search,
        [field]: filter,
      }));
    },
    [field, search, setSearch],
  );

  return [filter, setFilter];
}
