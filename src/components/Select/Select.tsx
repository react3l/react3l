import AntSelect, {ModeOption, OptionProps} from 'antd/lib/select';
import {AxiosError} from 'axios';
import classNames from 'classnames';
import {debounce} from 'core/helpers/debounce';
import {Model, Search} from 'core/models';
import React, {ReactElement, Ref} from 'react';
import './Select.scss';

const {Option} = AntSelect;

export interface SelectOptionProps<T extends Model> extends OptionProps {
  'data-content': T;

  [key: string]: any;
}

type DefaultSelectChange<T extends Model> = (value: string | number, subject?: T) => void;

export interface SelectProps<T extends Model, TSearch extends Search> {
  value?: number;

  defaultValue?: number;

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

  onChange?: DefaultSelectChange<T>;

  onSearchError?: (error: AxiosError<T>) => void;
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
      mode,
      value,
      defaultValue,
    } = props;

    const [list, setList] = React.useState<T[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(
      () => {
        if (defaultList) {
          setList(defaultList);
        }
      },
      [defaultList],
    );

    const handleLoadList = React.useCallback(
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
        if (getList) {
          handleLoadList();
        }
      },
      [getList, handleLoadList],
    );

    const handleToggle = React.useCallback(
      (visible: boolean) => {
        if (visible && getList) {
          handleLoadList();
        }
      },
      [getList, handleLoadList],
    );

    const handleChange = React.useCallback(
      (
        value: number | string,
        option?: ReactElement<SelectOptionProps<T>>,
      ) => {
        if (onChange) {
          if (value && option) {
            return onChange(value, option.props['data-content']);
          }
          return onChange(undefined, undefined);
        }
      },
      [onChange],
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

    return React.useMemo(
      () => (
        <AntSelect
          ref={ref}
          className={classNames('w-100', className)}
          onDropdownVisibleChange={handleToggle}
          mode={mode}
          onChange={handleChange}
          loading={loading}
          allowClear={allowClear}
          showSearch={allowSearch}
          onSearch={handleSearch}
          defaultValue={defaultValue}
          value={value}
        >
          {list.map((t: T) => (
            <Option key={t.id} data-content={t} value={t.id}>
              {t.name}
            </Option>
          ))}
          {children}
        </AntSelect>
      ),
      // tslint:disable-next-line:max-line-length
      [allowClear, allowSearch, children, className, defaultValue, handleChange, handleSearch, handleToggle, list, loading, mode, ref, value],
    );
  },
);

export default Select;
