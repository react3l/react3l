import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import CollectionMaster from './CollectionMaster';

describe('CollectionMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      (/ > as CollectionMaster as MemoryRouter)
      < /MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
