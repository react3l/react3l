import React, {ReactElement} from 'react';
import {MemoryRouter, MemoryRouterProps} from 'react-router-dom';
import ProvinceMaster from './ProvinceMaster';

describe('ProvinceMaster', () => {
  it('renders without crashing', async () => {
    const node: ReactElement<MemoryRouterProps> = (
      <MemoryRouter>
        <ProvinceMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
