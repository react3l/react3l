import {renderHook} from '@testing-library/react-hooks';
import {HOME_ROUTE} from 'config/route-consts';
import {useMaster} from 'core/hooks/useMaster';
import {configTests} from 'helpers/config-tests';
import React from 'react';
import {Model, Search} from '../models';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('useMaster', () => {
  it('useMaster works', () => {
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
          result: {
            current: [
              list,
              total,
              loading,
              setLoading,
            ],
          },
        } = renderHook(() => useMaster(HOME_ROUTE, masterList, masterCount, search, setSearch));
        expect(list.length).toEqual(1);
        expect(list[0]).toEqual(model);
        expect(total).toEqual(1);
        expect(loading).toEqual(false);
        expect(setLoading).toBeDefined();
      });
  });
});
