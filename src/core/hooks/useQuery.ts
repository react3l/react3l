import {flatten} from 'core/helpers';
import QueryString, {ParsedQuery} from 'query-string';
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {DEFAULT_TAKE} from '../config';
import {Search} from '../models';

/**
 * Sync search entity with query string
 *
 * @param search
 */
function parseSearch<TSearch extends Search>(search: string): TSearch {
  const queryString: ParsedQuery<string | number> = QueryString.parse(search);

  const tSearch: TSearch = new Search() as TSearch;

  Object
    .entries(queryString)
    .forEach(([key, value]) => {
      if (typeof value !== 'object') {
        switch (key) {
          case 'skip':
            if (typeof value === 'string') {
              tSearch.skip = parseInt(value, 10) || 0;
            }
            break;

          case 'take':
            if (typeof value === 'string') {
              tSearch.take = parseInt(value, 10) || DEFAULT_TAKE;
            }
            break;

          case 'orderType':
            if (typeof value === 'string') {
              Search.setOrderType(tSearch, value);
            }
            break;

          default:
            (tSearch as any)[key] = value;
            break;
        }
        return;
      }
      if (value !== null) {
        // Do something here
      }
    });
  return tSearch;
}

export function useQuery<TSearch extends Search>(defaultTSearch: TSearch, setTSearch: (tSearch: TSearch) => void): [TSearch, (tSearch: TSearch) => void] {
  const {pathname, search} = useLocation();
  const history = useHistory();

  const tSearch = React.useMemo(
    () => {
      return Search.clone<TSearch>({
        ...defaultTSearch,
        ...parseSearch<TSearch>(search),
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
