import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import CollectionDetail from './CollectionDetail';

describe('CollectionDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      (/ > as CollectionDetail as MemoryRouter)
      < /MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
