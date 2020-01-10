import {flatten, unflatten} from 'core/helpers';
import {JSONObject} from 'core/helpers/json';
import moment from 'moment';
import QueryString from 'query-string';
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import {DATE_FORMAT, DEFAULT_TAKE} from '../config';
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
                if (typeof v === 'string') {
                  if (isIdFilter) {
                    if (v.match(/^[0-9]+$/g)) {
                      defaultSearch[key][k] = parseInt(v as string, 10);
                      return;
                    }
                  }
                  if (v.match(/^(20|19)[0-9]{2}-[0-9]{2}-[0-9]{2}/)) {
                    defaultSearch[key][k] = moment(new Date(v));
                    return;
                  }
                  defaultSearch[key][k] = v;
                  return;
                }
                defaultSearch[key][k] = v;
              });
          }
          break;
      }
    });
  return defaultSearch;
}

export function isMomentObject(o: any) {
  return (typeof o === 'object' && o !== null && '_isAMomentObject' in o && 'format' in o);
}

export function stringifySearch<TSearch extends Search>(search: TSearch) {
  if (search) {
    const result: { [key: string]: string | number | boolean | null } = {};
    Object
      .entries(search)
      .forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          Object
            .entries(value)
            .forEach(([filterKey, filterValue]) => {
              if (typeof filterValue === 'object' && filterValue !== null) {
                if (isMomentObject(filterValue)) {
                  result[`${key}.${filterKey}`] = moment(filterValue).format(DATE_FORMAT);
                } else {
                  result[`${key}.${filterKey}`] = filterValue as any;
                }
              }
            });
          return;
        }
        result[key] = value;
      });
    return QueryString.stringify(flatten(result));
  }
  return '';
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
        search: stringifySearch<TSearch>(newTSearch),
      });
    },
    [history, pathname, setTSearch],
  );

  return [tSearch, setTSearchWithQueryString];
}
