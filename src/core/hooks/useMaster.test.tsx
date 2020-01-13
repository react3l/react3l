import {act, renderHook} from '@testing-library/react-hooks';
import {HOME_ROUTE} from 'config/route-consts';
import {useMaster} from 'core/hooks/useMaster';
import {configTests} from 'helpers/config-tests';
import React from 'react';
import {Model, Search} from '../models';

describe('useMaster', () => {
  it('useMaster works', () => {
    act(() => {
      configTests()
        .then(() => {
          const model: Model = new Model();
          const masterList = jest.fn().mockResolvedValue([model]);
          const masterCount = jest.fn().mockResolvedValue(1);
          const {
            result: {
              current: [
                search,
                setSearch,
              ],
            },
          } = renderHook(() => React.useState<Search>(new Search()));
          const {
            result:
              {
                current: [
                  list,
                ],
              },
          } = renderHook(() => useMaster(HOME_ROUTE, masterList, masterCount, search, setSearch));
          expect(list[0]).toEqual(model);
        });
    });
  });
});
