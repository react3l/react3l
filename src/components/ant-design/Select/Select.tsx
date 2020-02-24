import AntSelect, {OptionProps} from 'antd/lib/select';
import {AxiosError} from 'axios';
import classNames from 'classnames';
import 'components/ant-design/Select/Select.scss';
import {debounce} from 'core/helpers';
import {Model, Search} from 'core/models';
import React, {ReactElement, Ref} from 'react';

const {Option} = AntSelect;

export interface SelectOptionProps<T extends Model> extends OptionProps {
  'data-content': T;

  [key: string]: any;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t.name;
}

export type DefaultSelectChange<T extends Model> = (value: string | number, subject?: T) => void;

export interface SelectProps<T extends Model, TSearch extends Search> {
  value?: number | string;

  defaultValue?: number | string;

  children?: ReactElement<SelectOptionProps<T>> | Array<ReactElement<SelectOptionProps<T>>>;

  list?: T[];

  getList?: (tSearch?: TSearch) => Promise<T[]>;

  search?: TSearch;

  setSearch?: (search?: TSearch) => void;

  searchField?: string;

  allowClear?: boolean;

  disabled?: boolean;

  className?: string;

  onChange?: DefaultSelectChange<T>;

  onSearchError?: (error: AxiosError<T>) => void;

  render?: (t: T) => string;
}

const Select = React.forwardRef(
  <T extends Model, TSearch extends Search>(props: SelectProps<T, TSearch>, ref: Ref<any>) => {
    const {
      search,
      setSearch,
      className,
      list: defaultList,
      children,
      getList,
      onSearchError,
      allowClear,
      onChange,
      searchField,
      value,
      defaultValue,
      render,
    } = props;

    const [list, setList] = React.useState<T[]>(defaultList ?? []);
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
      async () => {
        try {
          setLoading(true);
          setList(await getList(search));
        } catch (error) {
          onSearchError(error);
        }
        setLoading(false);
      },
      [getList, onSearchError, search],
    );

    const handleSearch = React.useMemo(
      () => debounce((value: string) => {
        setSearch(Search.clone<TSearch>({
          ...search,
          [searchField]: value,
        }));
      }),
      [search, searchField, setSearch],
    );

    const handleToggle = React.useCallback(
      async (visible: boolean) => {
        if (visible && typeof getList === 'function') {
          await handleLoadList();
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

    return (
      <AntSelect
        ref={ref}
        className={classNames('w-100', className)}
        onDropdownVisibleChange={handleToggle}
        mode="default"
        onChange={handleChange}
        loading={loading}
        allowClear={allowClear}
        showSearch={typeof getList === 'function'}
        onSearch={handleSearch}
        defaultValue={defaultValue}
        value={value}
      >
        {list.map((t: T) => (
          <Option key={t.id} data-content={t} value={t.id}>
            {render(t)}
          </Option>
        ))}
        {children}
      </AntSelect>
    );
  },
);

Select.defaultProps = {
  render: defaultRenderObject,
};

export default Select;
