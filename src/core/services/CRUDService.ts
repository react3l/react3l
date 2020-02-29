import {Model, ModelFilter} from 'core/models';
import React, {Dispatch, SetStateAction} from 'react';
import {Filter} from 'core/filters';
import {AxiosError} from 'axios';
import {API_BASE_URL} from 'core/config';
import {url} from 'core/helpers/string';
import {generalLanguageKeys} from 'config/consts';
import nameof from 'ts-nameof.macro';

export class CRUDService {
  public useMaster<T extends Model, TFilter extends ModelFilter>(
    modelClass: new () => T,
    modelFilterClass: new () => TFilter,
    getList: (filter: TFilter) => Promise<T[]>,
    count: (filter: TFilter) => Promise<number>,
  ): [
    TFilter,
    Dispatch<SetStateAction<TFilter>>,
    T[],
    Dispatch<SetStateAction<T[]>>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
    number,
    boolean,
    T,
    (t: T) => () => void,
    () => void,
    <TF extends Filter>(field: string) => (f: TF) => void,
    () => void,
    () => void,
  ] {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<TFilter>(new modelFilterClass());
    const [list, setList] = React.useState<T[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const [previewModel, setPreviewModel] = React.useState<T>(new modelClass());
    const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);

    React.useEffect(
      () => {
        setLoading(true);
        Promise.all([
          getList(filter),
          count(filter),
        ])
          .then(([list, total]) => {
            setList(list);
            setTotal(total);
          })
          .finally(() => {
            setLoading(false);
          });
      },
      [count, filter, getList],
    );

    const handleOpenPreview = React.useCallback(
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
        setPreviewModel(new modelClass());
      },
      [modelClass],
    );

    const handleFilter = React.useCallback(
      <TF extends Filter>(field: string) => {
        return (f: TF) => {
          setFilter(ModelFilter.clone<TFilter>({
            ...filter,
            [field]: f,
          }));
        };
      },
      [filter],
    );

    const handleSearch = React.useCallback(
      () => {
        setFilter(ModelFilter.clone<TFilter>(filter));
      },
      [filter],
    );

    const handleReset = React.useCallback(
      () => {
        setFilter(ModelFilter.clone<TFilter>(new modelFilterClass()));
      },
      [modelFilterClass],
    );

    return [
      filter,
      setFilter,
      list,
      setList,
      loading,
      setLoading,
      total,
      previewVisible,
      previewModel,
      handleOpenPreview,
      handleClosePreview,
      handleFilter,
      handleSearch,
      handleReset,
    ];
  }

  public useEnumList<T extends Model>(
    handleList: () => Promise<T[]>,
  ): [
    T[],
    Dispatch<SetStateAction<T[]>>
  ] {
    const [list, setList] = React.useState<T[]>([]);

    React.useEffect(
      () => {
        handleList()
          .then((list: T[]) => {
            setList(list);
          });
      },
      [handleList],
    );

    return [
      list,
      setList,
    ];
  }

  public useImport(
    onImport: (file: File) => Promise<void>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    onSuccess?: () => void,
    onError?: (error: AxiosError<any> | Error) => void,
  ): [
    (event: React.ChangeEvent<HTMLInputElement>) => void,
  ] {
    return [
      React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            setLoading(true);
            onImport(file)
              .then(onSuccess)
              .catch(onError)
              .finally(() => {
                setLoading(false);
              });
          }
        },
        [onError, onImport, onSuccess, setLoading],
      ),
    ];
  }

  public useExport(
    baseRoute: string,
  ): [
    () => void
  ] {
    return [
      React.useCallback(
        () => {
          window.open(url(API_BASE_URL, baseRoute, nameof(generalLanguageKeys.actions.export)), '_blank');
        },
        [baseRoute],
      ),
    ];
  }
}

export const crudService: CRUDService = new CRUDService();
