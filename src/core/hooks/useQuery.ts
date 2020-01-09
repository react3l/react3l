import {flatten, unflatten} from 'core/helpers';
import {JSONObject} from 'core/helpers/json';
import QueryString from 'query-string';
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import {DEFAULT_TAKE} from '../config';
import {Search} from '../models';

/**
 * Sync search entity with query string
 *
 * @param search
 */
function parseSearch<TSearch extends Search>(search: string, defaultSearch: TSearch): TSearch {
  const queryString: JSONObject = unflatten(QueryString.parse(search) as { [key: string]: string });

  Object
    .entries(queryString)
    .forEach(([key, value]) => {
      switch (key) {
        case nameof(defaultSearch.skip):
          if (typeof value === 'string') {
            defaultSearch.skip = parseInt(value, 10) || 0;
          }
          break;

        case nameof(defaultSearch.take):
          if (typeof value === 'string') {
            defaultSearch.take = parseInt(value, 10) || DEFAULT_TAKE;
          }
          break;

        case nameof(defaultSearch.orderType):
          if (typeof value === 'string') {
            Search.setOrderType(defaultSearch, value);
          }
          break;

        default:
          if (typeof value === 'object' && value !== null) {
            const isIdFilter: boolean = key.endsWith('Id') || key === 'id';
            Object
              .entries(value)
              .forEach(([k, v]) => {
                if (isIdFilter && typeof v === 'string' && v.match(/^[0-9]+$/)) {
                  defaultSearch[key][k] = parseInt(v as string, 10);
                } else {
                  defaultSearch[key][k] = v;
                }
              });
          }
          break;
      }
    });
  return defaultSearch;
}

export function useQuery<TSearch extends Search>(defaultTSearch: TSearch, setTSearch: (tSearch: TSearch) => void): [TSearch, (tSearch: TSearch) => void] {
  const {pathname, search} = useLocation();
  const history = useHistory();

  const tSearch = React.useMemo(
    () => {
      return Search.clone<TSearch>({
        ...parseSearch<TSearch>(search, defaultTSearch),
      });
    },
    [defaultTSearch, search],
  );

  const setTSearchWithQueryString = React.useCallback(
    (newTSearch: TSearch) => {
      setTSearch(newTSearch);
      history.replace({
        pathname,
        search: QueryString.stringify(flatten(newTSearch)),
      });
    },
    [history, pathname, setTSearch],
  );

  return [tSearch, setTSearchWithQueryString];
}
