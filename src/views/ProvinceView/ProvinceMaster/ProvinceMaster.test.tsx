import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ProvinceMaster from './ProvinceMaster';

describe('ProvinceMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ProvinceMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
