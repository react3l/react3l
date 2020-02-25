import {Moment} from 'moment';
import {join} from 'path';
import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {DetailParams} from 'react3l';
import nameof from 'ts-nameof.macro';
import v4 from 'uuid/v4';
import {DEFAULT_TAKE, defaultActions} from '../config';
import {Filter, IdFilter} from '../filters';
import {debounce} from '../helpers';
import {Model, Search} from '../models';

export class CRUDService {
  public useChangeHandlers<T extends Model>(model?: T, setModel?: (t: T) => void): [
    (field: string) => (value) => void,
    (field: string) => (value) => void,
    (field: string) => (value) => void,
  ] {
    const handleSetInputValue = React.useCallback(
      (field: string, value: string | number | boolean | null | undefined) => {
        setModel(Model.clone<T>({
          ...model,
          [field]: value,
        }));
      },
      [model, setModel],
    );

    const handleDebounceInputValue = React.useCallback(
      debounce(handleSetInputValue),
      [handleSetInputValue],
    );

    const handleChangeSimpleField = React.useCallback(
      (field: string, debounce: boolean = false) => {
        return (event: React.ChangeEvent<HTMLInputElement> | number | string | boolean) => {
          if (typeof event === 'object') {
            if ('target' in event) {
              if (debounce) {
                return handleDebounceInputValue(field, event.target.value);
              }
              return handleSetInputValue(field, event.target.value);
            }
            if ('format' in event) {
              setModel(Model.clone<T>({
                ...model,
                [field]: event,
              }));
            }
          }
          if (debounce) {
            return handleDebounceInputValue(field, event);
          }
          return handleSetInputValue(field, event);
        };
      },
      [handleDebounceInputValue, handleSetInputValue, model, setModel],
    );

    const handleUpdateDateField = React.useCallback(
      (field: string) => {
        return (moment: Moment) => {
          setModel(Model.clone<T>({
            ...model,
            [field]: moment,
          }));
        };
      },
      [model, setModel],
    );

    const handleChangeObjectField = React.useCallback(
      (field: string) => {
        return (id?: number | string | null, t?: T) => {
          setModel(Model.clone<T>({
            ...model,
            [field]: t,
            [`${field}Id`]: id,
          }));
        };
      },
      [model, setModel],
    );

    return [
      handleChangeSimpleField,
      handleChangeObjectField,
      handleUpdateDateField,
    ];
  }

  public useContentTable<T extends Model, TContent extends Model>(
    model: T,
    setModel: (t: T) => void,
    field: string,
  ): [
    TContent[],
    (v: TContent[]) => void,
    () => void,
    (id: number) => () => void,
  ] {
    const value: TContent[] = React.useMemo(
      () => {
        if (model[field]) {
          model[field]?.forEach((t: T) => {
            if (!t?.key) {
              if (t?.id) {
                t.key = t.id;
              } else {
                t.key = v4();
              }
            }
          });
          return model[field];
        }
        return [];
      },
      [field, model],
    );

    const setValue = React.useCallback(
      (v: TContent[]) => {
        setModel(Model.clone<T>({
          ...model,
          [field]: v,
        }));
      },
      [field, model, setModel],
    );

    const handleDelete = React.useCallback(
      (id: number) => {
        return () => {
          const newValue: TContent[] = value.filter((v: TContent) => v.id !== id);
          setValue(newValue);
        };
      },
      [value, setValue],
    );

    const handleAdd = React.useCallback(
      () => {
        const newContent: TContent = new Model() as TContent;
        newContent.key = v4();
        if (value instanceof Array) {
          setValue([
            ...value,
            newContent,
          ]);
        } else {
          setValue([
            newContent,
          ]);
        }
      },
      [setValue, value],
    );

    return [value, setValue, handleAdd, handleDelete];
  }

  public useDefaultList<T1 extends Model, T2 extends Model>(model: T1, field: string): T2[] {
    return React.useMemo(
      () => {
        const reference: T2 = model[field];
        if (reference) {
          return [reference];
        }
        return [];
      },
      [field, model],
    );
  }

  public useDetail<T extends Model>(
    baseRoute: string,
    getDetail?: (t?: T) => Promise<T>,
    saveDetail?: (t?: T) => Promise<T>,
    onSavingError?: (error: Error) => void,
  ): [
    T,
    (t: T) => void,
    boolean,
    (loading: boolean) => void,
    boolean,
    () => void,
    () => void,
  ] {
    const {id} = useParams<DetailParams>();
    const [t, setT] = React.useState<T>(new Model() as T);
    const [loading, setLoading] = React.useState<boolean>(false);
    const isDetail: boolean = typeof id === 'string';
    const history = useHistory();

    const handleGoBack = React.useCallback(
      () => {
        history.push(join(baseRoute));
      },
      [baseRoute, history],
    );

    const handleSave = React.useCallback(
      async () => {
        setLoading(true);
        try {
          const newT: T = await saveDetail(t);
          if (t?.id) {
            setT(newT);
          } else {
            history.push(join(baseRoute, newT.id));
          }
        } catch (error) {
          if (typeof onSavingError === 'function') {
            onSavingError(error);
          }
        }
        setLoading(false);
      },
      [baseRoute, history, onSavingError, saveDetail, t],
    );

    React.useEffect(
      () => {
        if (typeof getDetail === 'function' && isDetail) {
          setLoading(true);
          const t: T = Model.clone<Model>({
            id,
          }) as T;
          getDetail(t)
            .then((t: T) => {
              setT(t);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      },
      [getDetail, id, isDetail],
    );

    return [t, setT, loading, setLoading, isDetail, handleGoBack, handleSave];
  }

  public useEnumList<T extends Model>(
    list: () => Promise<T[]>,
    onError?: (error: Error) => void,
  ): [T[], (list: T[]) => void, boolean] {
    const [enums, setEnums] = React.useState<T[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    React.useEffect(
      () => {
        setLoading(true);
        list()
          .then((enums: T[]) => {
            setEnums(enums);
          })
          .catch(onError)
          .finally(
            () => {
              setLoading(false);
            },
          );
      },
      [list, onError],
    );
    return [enums, setEnums, loading];
  }

  public useFilter<TSearch extends Search, P extends keyof TSearch>(
    search: TSearch,
    setSearch: (search: TSearch) => void,
    field: P,
  ): [
    TSearch[P],
    (filter: TSearch[P]) => void,
  ] {
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

  public useMaster<T extends Model, TSearch extends Search>(
    baseRoute: string,
    masterList: (tSearch?: TSearch) => Promise<T[]>,
    masterCount: (tSearch?: TSearch) => Promise<number>,
    tSearch: new () => TSearch,
  ): [
    T[],
    TSearch,
    (tSearch: TSearch) => void,
    number,
    boolean,
    () => void,
    () => void,
    (id: number) => () => void,
    (field: string) => (filter: Filter) => void,
    boolean,
    T,
    (t: T) => () => void,
    () => void,
  ] {
    const [search, setSearch] = React.useState<TSearch>(new tSearch());
    const [list, setList] = React.useState<T[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [total, setTotal] = React.useState<number>(0);
    const history = useHistory();
    const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);
    const [previewModel, setPreviewModel] = React.useState<T>(Model.clone<T>());

    const handlePreview = React.useCallback(
      (t: T) => {
        return () => {
          setPreviewModel(t);
          setPreviewVisible(true);
        };
      },
      [],
    );

    const handleClosePreview = React.useCallback(
      () => {
        setPreviewVisible(false);
      },
      [],
    );

    const handleAdd = React.useCallback(
      () => {
        history.push(join(baseRoute, nameof(defaultActions.add)));
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
        const newSearch: TSearch = Search.clone<TSearch>(search);
        Object
          .entries(newSearch)
          .forEach(([key, value]) => {
            switch (key) {
              case nameof(newSearch.skip):
                newSearch.skip = 0;
                break;

              case nameof(newSearch.take):
                newSearch.take = DEFAULT_TAKE;
                break;

              case nameof(newSearch.orderBy):
                newSearch.orderBy = undefined;
                break;

              case nameof(newSearch.orderType):
                newSearch.orderBy = undefined;
                break;

              default:
                if (typeof value === 'object' && value !== null) {
                  Object
                    .entries(value)
                    .forEach(([filterKey]) => {
                      value[filterKey] = undefined;
                    });
                  newSearch[key] = {...value};
                }
                break;
            }
          });
        setSearch(newSearch);
      },
      [search, setSearch],
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
      search,
      setSearch,
      total,
      loading,
      handleAdd,
      handleReset,
      handleEdit,
      handleFilter,
      previewVisible,
      previewModel,
      handlePreview,
      handleClosePreview,
    ];
  }

  public usePreloadList<T extends Model, TSearch extends Search>(
    getList: (search: TSearch) => Promise<T[]>,
    id: IdFilter,
  ): T[] {
    const [list, setList] = React.useState<T[]>([]);

    React.useEffect(
      () => {
        getList({id, ...new Search() as TSearch})
          .then(setList);
      },
      [getList, id],
    );

    return list;
  }
}

export const crudService: CRUDService = new CRUDService();
