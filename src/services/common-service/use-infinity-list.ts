import React, {Dispatch, Reducer} from 'react';
import {Model, ModelFilter} from 'core';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {DEFAULT_TAKE} from 'config';

export type List<T> = Record<number, T[]>;

export interface ListData<T extends Model, TFilter extends ModelFilter> {
  refreshing: boolean;

  loading: boolean;

  filter: TFilter;

  list: List<T>;

  total: number;
}

export interface ListAction<T extends Model,
  TFilter extends ModelFilter,
  P extends keyof TFilter> {
  type: string;

  list?: T[];

  searchField?: P;

  searchType?: keyof TFilter[P];

  searchValue?: string;

  total?: number;

  newFilter?: TFilter;
}

export const ACTION_SET_LIST: string = 'ACTION_SET_LIST';

export const ACTION_SEARCH_LIST: string = 'ACTION_SEARCH_LIST';

export const ACTION_REFRESH_LIST: string = 'ACTION_REFRESH_LIST';

export const ACTION_RESET_FILTER: string = 'ACTION_RESET_FILTER';

export const ACTION_LOAD_MORE_ITEMS: string = 'ACTION_LOAD_MORE_ITEMS';

export const ACTION_TURN_OFF_LOADING: string = 'ACTION_TURN_OFF_LOADING';

export function listReducer<T extends Model,
  TFilter extends ModelFilter,
  P extends keyof TFilter>(state: ListData<T, TFilter>, action: ListAction<T, TFilter, P>): ListData<T, TFilter> {
  switch (action.type) {
    case ACTION_REFRESH_LIST:
      return {
        ...state,
        list: {},
        filter: {
          ...state.filter,
          skip: 0,
          take: DEFAULT_TAKE,
        },
        loading: false,
        refreshing: true,
      };

    case ACTION_RESET_FILTER:
      return {
        ...state,
        filter: action.newFilter,
        list: {},
        total: 0,
        loading: true,
        refreshing: false,
      };

    case ACTION_SEARCH_LIST:
      const isStringField: boolean = typeof action.searchType === 'undefined';
      const isEmptyString: boolean = action.searchValue === '';
      return {
        ...state,
        list: {},
        filter: {
          ...state.filter,
          [action.searchField]: !isEmptyString
            ? isStringField
              ? action.searchValue
              : {
                [action.searchType]: action.searchValue,
              }
            : isStringField
              ? null
              : {},
          skip: 0,
          take: DEFAULT_TAKE,
        },
        loading: true,
        refreshing: true,
      };

    case ACTION_LOAD_MORE_ITEMS:
      return {
        ...state,
        filter: {
          ...state.filter,
          skip: state.filter.skip + DEFAULT_TAKE,
          take: DEFAULT_TAKE,
        },
        loading: true,
        refreshing: false,
      };

    case ACTION_SET_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          [state.filter.skip]: action.list,
        },
        total: action.total,
      };

    case ACTION_TURN_OFF_LOADING:
      return {
        ...state,
        loading: false,
        refreshing: false,
      };

    default:
      return state;
  }
}

export function useInfinityList<T extends Model,
  TFilter extends ModelFilter,
  P extends keyof TFilter = any>(
  FilterClass: new () => TFilter,
  getList: (filter: TFilter) => Observable<T[]>,
  getCount: (filter: TFilter) => Observable<number>,
  searchField: P,
  searchType?: keyof TFilter[P],
): [
  // List Data
  T[],
  number,
  boolean,
  boolean,
  TFilter,
  // Dispatch function
  () => void,
  () => void,
  (searchValue: string) => void,
  Dispatch<ListAction<T, TFilter, P>>,
  boolean,
] {
  const [
    {
      // Loaded items
      list,
      // Loading state
      loading,
      // Refreshing state
      refreshing,
      // Filter object
      filter,
      // Total filtered items
      total,
    },
    dispatch,
  ] = React.useReducer<Reducer<ListData<T, TFilter>, ListAction<T, TFilter, P>>>(
    listReducer,
    {
      list: {},
      filter: new FilterClass(),
      loading: true,
      refreshing: true,
      total: 0,
    },
  );

  const arrayList: T[] = React.useMemo(
    () => {
      return [].concat(...Object.values(list));
    },
    [list]
  );

  const handleLoadList = React.useCallback(
    () => {
      return (
        forkJoin([getList(filter), getCount(filter)])
          // Pipe loading
          .pipe(
            finalize(() => {
              dispatch({
                type: ACTION_TURN_OFF_LOADING,
              });
            }),
          )
      );
    },
    [filter, getCount, getList]
  );

  React.useEffect(
    () => {
      const subscription: Subscription = handleLoadList()
        // Subscription
        .pipe(
          finalize(() => {
            dispatch({
              type: ACTION_TURN_OFF_LOADING,
            });
          }),
        )
        .subscribe(([list, total]) => {
          dispatch({
            type: ACTION_SET_LIST,
            list,
            total,
          });
        });

      return function cleanup() {
        subscription.unsubscribe();
      };
    },
    [handleLoadList]
  );

  const handleRefresh = React.useCallback(
    () => {
      dispatch({
        type: ACTION_REFRESH_LIST,
      });
    },
    []
  );

  const handleLoadMore = React.useCallback(
    () => {
      if (
        arrayList.length < total &&
        arrayList.length >= DEFAULT_TAKE &&
        total > 0 &&
        !loading
      ) {
        dispatch({
          type: ACTION_LOAD_MORE_ITEMS,
        });
      }
    },
    [arrayList.length, loading, total]
  );

  const handleSearch = React.useCallback(
    (searchValue: string) => {
      dispatch({
        type: ACTION_SEARCH_LIST,
        searchValue,
        searchType,
        searchField,
      });
    },
    [searchField, searchType],
  );

  return [
    arrayList,
    total,
    loading,
    refreshing,
    filter,
    handleLoadMore,
    handleRefresh,
    handleSearch,
    dispatch,
    refreshing,
  ];
}
