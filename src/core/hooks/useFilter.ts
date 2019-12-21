import {debounce} from 'core/helpers';
import {Model, Search} from 'core/models';
import React, {ChangeEvent} from 'react';

type FilterResult<T extends Model> = [
  (field: string) => (event?: ChangeEvent | PrimitiveValue | PrimitiveValue[]) => void,
  (field: string) => (value?: number, model?: T) => void,
];

export type PrimitiveValue = number | string | boolean | null | undefined;

export function useFilter<T extends Model, TSearch extends Search>(
  search: TSearch,
  setSearch: (tSearch: TSearch) => void,
): FilterResult<T> {
  const handleSetInputValue = React.useCallback(
    (field: string, value?: string | number | null) => {
      const newSearch: TSearch = Search.clone<TSearch>({
        ...search,
        [field]: value,
        skip: 0,
      });
      if (typeof newSearch[field] === 'string' && newSearch[field] === '') {
        delete newSearch[field];
      }
      setSearch(newSearch);
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

  return [handleFilter, handleObjectFilter];
}
