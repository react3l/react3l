import {IdFilter} from 'core/filters';
import {Model, Search} from 'core/models';
import React from 'react';

export function usePreloadList<T extends Model, TSearch extends Search>(
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
