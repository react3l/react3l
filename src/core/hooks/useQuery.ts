import {DEFAULT_TAKE, Search} from 'core/models/Search';
import QueryString, {ParsedQuery} from 'query-string';
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';

/**
 * Sync search entity with query string
 *
 * @param search
 */
function parseSearch<TSearch extends Search>(search: string): TSearch {
  const queryString: ParsedQuery<string> = QueryString.parse(search);

  const tSearch: TSearch = new Search() as TSearch;

  Object
    .entries(queryString)
    .forEach(([key, value]) => {
      switch (key) {
        case 'skip':
          if (typeof value === 'string') {
            tSearch.skip = parseInt(value, 10);
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
    });
  return tSearch;
}

export function useQuery<TSearch extends Search>() {
  const {search, pathname, hash, state} = useLocation();

  const history = useHistory();

  const [tSearch, setTSearch] = React.useState<TSearch>(parseSearch<TSearch>(search));

  const setTSearchWithQueryString = React.useCallback(
    (newTSearch: TSearch) => {
      if (tSearch) {
        if ('clone' in tSearch) {
          const search: TSearch = {} as TSearch;
          Object.assign(search, tSearch, newTSearch);
          setTSearch(search);
          history.push({
            hash,
            pathname,
            state,
            search: QueryString.stringify(tSearch),
          });
        }
      }
    },
    [tSearch, setTSearch, hash, history, pathname, state],
  );

  return [tSearch, setTSearchWithQueryString];
}
