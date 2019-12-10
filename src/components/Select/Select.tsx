import AntSelect, {ModeOption, OptionProps} from 'antd/lib/select';
import {AxiosError} from 'axios';
import {debounce} from 'core/helpers/debounce';
import {Model, Search} from 'core/models';
import React, {ReactElement, Ref} from 'react';
import './Select.scss';

const {Option} = AntSelect;

export interface SelectOptionProps<T extends Model> extends OptionProps {
  [key: string]: any;

  'data-content': T;
}

type DefaultSelectChange<T extends Model> = (value: string | number, subject?: T) => void;

type MultipleSelectChange<T extends Model> = (values: Array<string | number>, subjects?: T[]) => void;

interface SelectProps<T extends Model, TSearch extends Search> {
  value?: Array<string | number>;

  defaultValue?: Array<string | number>;

  mode?: ModeOption;

  children?: ReactElement<SelectOptionProps<T>> | Array<ReactElement<SelectOptionProps<T>>>;

  list?: T[];

  getList?: (tSearch?: TSearch) => Promise<T[]>;

  search?: TSearch;

  setSearch?: (search?: TSearch) => void;

  searchField?: string;

  allowSearch?: boolean;

  allowClear?: boolean;

  disabled?: boolean;

  className?: string;

  onChange?: DefaultSelectChange<T> | MultipleSelectChange<T>;

  onSearchError?: (error: AxiosError<T>) => void;

  isEnum?: boolean;
}

const Select = React.forwardRef(
  <T extends Model, TSearch extends Search>(props: SelectProps<T, TSearch>, ref: Ref<any>) => {
    const {
      className,
      list: defaultList,
      children,
      getList,
      search,
      setSearch,
      onSearchError,
      allowClear,
      allowSearch,
      onChange,
      searchField,
      isEnum,
      mode,
    } = props;

    const [list, setList] = React.useState<T[]>(defaultList || []);
    const [loading, setLoading] = React.useState<boolean>(false);

    const handlePromiseLoad = React.useCallback(
      () => {
        setLoading(true);
        getList(search)
          .then((list: T[]) => {
            setList(list);
          })
          .catch(onSearchError)
          .finally(() => {
            setLoading(false);
          });
      },
      [getList, search, setLoading, setList, onSearchError],
    );

    React.useEffect(
      () => {
        if (isEnum && getList) {
          handlePromiseLoad();
        }
      },
      [isEnum, getList, handlePromiseLoad],
    );

    const handleToggle = React.useCallback(
      (visible: boolean) => {
        if (visible && getList && !isEnum) {
          handlePromiseLoad();
        }
      },
      [getList, handlePromiseLoad, isEnum],
    );

    const handleDefaultChange = React.useCallback(
      (
        value: number | string,
        option?: ReactElement<SelectOptionProps<T>>,
      ) => {
        if (onChange) {
          if (value && option && option instanceof Array) {
            return (onChange as DefaultSelectChange<T>)(value, option.props['data-content']);
          }
          return onChange(undefined, undefined);
        }
      },
      [onChange],
    );

    const handleMultipleChange = React.useCallback(
      (
        values: Array<number | string>,
        options?: Array<ReactElement<SelectOptionProps<T>>>,
      ) => {
        if (onChange) {
          const subjects: T[] = options.map((option: ReactElement<SelectOptionProps<T>>) => {
            return option.props['data-content'];
          });
          (onChange as MultipleSelectChange<T>)(values, subjects);
        }
      },
      [onChange],
    );

    const handleChange = React.useCallback(
      (values, options?) => {
        if (mode === 'default') {
          return handleDefaultChange(values, options);
        }
        return handleMultipleChange(values, options);
      },
      [handleDefaultChange, handleMultipleChange, mode],
    );

    const handleSearch = React.useMemo(
      () => debounce((value: string) => {
        setSearch(Search.clone<TSearch>({
          ...search,
          [searchField]: value,
        }));
      }),
      [setSearch, search, searchField],
    );

    return (
      <AntSelect
        ref={ref}
        className={className}
        onDropdownVisibleChange={handleToggle}
        onChange={handleChange}
        loading={loading}
        allowClear={allowClear}
        showSearch={allowSearch}
        onSearch={handleSearch}
      >
        {list.map((t: T) => (
          <Option key={t.id} data-content={t} value={t.id}>
            {t.name}
          </Option>
        ))}
        {children}
      </AntSelect>
    );
  },
);

export default Select;
