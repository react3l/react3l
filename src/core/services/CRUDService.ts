import {Model, ModelFilter} from 'core/models';
import React, {Dispatch, SetStateAction} from 'react';
import {Filter} from 'core/filters';
import {AxiosError} from 'axios';
import {API_BASE_URL} from 'core/config';
import {url} from 'core/helpers/string';
import {generalLanguageKeys} from 'config/consts';
import nameof from 'ts-nameof.macro';
import {useParams} from 'react-router';
import {debounce} from 'core/helpers/debounce';
import {Moment} from 'moment';
import v4 from 'uuid/v4';
import {TableRowSelection} from 'antd/lib/table';

export class CRUDService {
  public useMaster<T extends Model, TFilter extends ModelFilter>(
    modelClass: new () => T,
    modelFilterClass: new () => TFilter,
    count: (filter: TFilter) => Promise<number>,
    getList: (filter: TFilter) => Promise<T[]>,
    getDetail: (id: number | string) => Promise<T>,
  ): [
    TFilter,
    Dispatch<SetStateAction<TFilter>>,
    T[],
    Dispatch<SetStateAction<T[]>>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
    number,
    boolean,
    boolean,
    T,
    (id: string | number) => () => void,
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
    const [previewLoading, setPreviewLoading] = React.useState<boolean>(false);

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
      (id: number | string) => {
        return () => {
          setPreviewModel(new modelClass());
          setPreviewLoading(true);
          setPreviewVisible(true);
          getDetail(id)
            .then((tDetail: T) => {
              setPreviewModel(tDetail);
            })
            .finally(() => {
              setPreviewLoading(false);
            });
        };
      },
      [getDetail, modelClass],
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
      previewLoading,
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

  public useDetail<T extends Model>(
    modelClass: new () => T,
    handleGet: (id: number | string) => Promise<T>,
    onSave: (t: T) => Promise<T>,
  ): [
    T,
    Dispatch<SetStateAction<T>>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
    boolean,
    () => void,
  ] {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [t, setT] = React.useState<T>(new modelClass());
    const {id} = useParams();
    const isDetail: boolean = (typeof id !== 'undefined');

    React.useEffect(
      () => {
        if (isDetail) {
          setLoading(true);
          handleGet(id)
            .then((t: T) => {
              setT(t);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      },
      [handleGet, id, isDetail],
    );

    const handleSave = React.useCallback(
      () => {
        setLoading(true);
        onSave(t)
          .then((t: T) => {
            setT(t);
          })
          .finally(() => {
            setLoading(false);
          });
      },
      [onSave, t],
    );

    return [
      t,
      setT,
      loading,
      setLoading,
      isDetail,
      handleSave,
    ];
  }

  public useChangeHandlers<T extends Model>(
    model?: T,
    setModel?: (t: T) => void,
  ): [
    (field: string) => (value) => void,
    (field: string) => (value) => void,
    (field: string) => (value) => void,
  ] {
    const handleSetInputValue = React.useCallback(
      (field: string, value?: string | number | boolean | null) => {
        setModel(Model.clone<T>({
          ...model, [field]: value,
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
          if (typeof event === 'object' && event !== null) {
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
          return handleSetInputValue(field, event as (string | number | boolean));
        };
      },
      [handleDebounceInputValue, handleSetInputValue, model, setModel],
    );

    const handleUpdateDateField = React.useCallback(
      (field: string) => {
        return (moment: Moment) => {
          setModel(Model.clone<T>({
            ...model, [field]: moment,
          }));
        };
      },
      [model, setModel],
    );

    const handleChangeObjectField = React.useCallback(
      (field: string) => {
        return (id?: number | string | null, t?: T) => {
          setModel(Model.clone<T>({
            ...model, [field]: t,
            [`${field}Id`]: id,
          }));
        };
      },
      [model, setModel],
    );
    return [handleChangeSimpleField, handleChangeObjectField, handleUpdateDateField];
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
          ...model, [field]: v,
        }));
      },
      [field, model, setModel],
    );

    const handleDelete = React.useCallback(
      (index: number) => {
        return () => {
          value.splice(index, 1);
          setValue([...value]);
        };
      },
      [value, setValue],
    );

    const handleAdd = React.useCallback(
      () => {
        const newContent: TContent = new Model() as TContent;
        newContent.key = v4();
        if (value instanceof Array) {
          setValue([...value, newContent]);
        } else {
          setValue([newContent]);
        }
      },
      [setValue, value],
    );

    return [value, setValue, handleAdd, handleDelete];
  }

  public useBulkModal<T extends Model, TModelFilter extends ModelFilter>(
    modelFilterClass: new () => TModelFilter,
    getList: (filter: TModelFilter) => Promise<T[]>,
    count: (filter: TModelFilter) => Promise<number>,
  ): [
    TModelFilter,
    Dispatch<SetStateAction<TModelFilter>>,
    boolean,
    boolean,
    T[],
    number,
    () => void,
    () => void,
  ] {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<TModelFilter>(new modelFilterClass());
    const [list, setList] = React.useState<T[]>([]);
    const [total, setTotal] = React.useState<number>(0);

    const handleOpenModal = React.useCallback(
      () => {
        setVisible(true);
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

    const handleCloseModal = React.useCallback(
      () => {
        setVisible(false);
      },
      [],
    );

    return [
      filter,
      setFilter,
      visible,
      loading,
      list,
      total,
      handleOpenModal,
      handleCloseModal,
    ];
  }

  public useDefaultSelectedRowKeys<T extends Model>(list: T[]): number[] {
    return React.useMemo(
      () => list
        .filter((t: T) => typeof t.id === 'number' && !Number.isNaN(t.id))
        .map((t: T) => t.id),
      [list],
    );
  }

  public useDefaultList<T extends Model>(t: T): T[] {
    return React.useMemo(
      () => {
        if (typeof t === 'object' && t !== null) {
          return [t];
        }
        return [];
      },
      [t],
    );
  }

  public useContentModal<T extends Model, TFilter extends ModelFilter>(
    getList: (tFilter: TFilter) => Promise<T[]>,
    count: (tFilter: TFilter) => Promise<number>,
    filterClass: new () => TFilter,
  ): [
    boolean,
    boolean,
    T[],
    number,
    () => void,
    () => void,
    TFilter,
    Dispatch<SetStateAction<TFilter>>,
  ] {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<TFilter>(new filterClass());
    const [list, setList] = React.useState<T[]>([]);
    const [total, setTotal] = React.useState<number>(0);

    const handleOpen = React.useCallback(
      () => {
        setVisible(true);
      },
      [],
    );

    const handleClose = React.useCallback(
      () => {
        setVisible(false);
      },
      [],
    );

    React.useEffect(
      () => {
        if (visible) {
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
        }
      },
      [count, filter, getList, visible],
    );

    return [
      loading,
      visible,
      list,
      total,
      handleOpen,
      handleClose,
      filter,
      setFilter,
    ];
  }

  public useContentModalList<T extends Model>(
    list: T[],
    setList: Dispatch<SetStateAction<T[]>>,
  ): TableRowSelection<T> {
    return React.useMemo(
      () => ({
        selectedRowKeys: list.map((t: T) => t.id),
        onSelect: (record: T, selected: boolean) => {
          if (selected) {
            list.push(record);
            setList([...list]);
          } else {
            setList(list.filter((t: T) => t.id !== record.id));
          }
        },
      }),
      [list, setList],
    );
  }
}

export const crudService: CRUDService = new CRUDService();
