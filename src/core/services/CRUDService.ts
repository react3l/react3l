import {Model, ModelFilter} from 'core/models';
import React, {Dispatch, SetStateAction} from 'react';
import {Filter} from 'core/filters';

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
          ModelFilter.clone<TFilter>({
            ...filter,
            [field]: f,
          });
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
}

export const crudService: CRUDService = new CRUDService();
