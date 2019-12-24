import React, {ReactElement} from 'react';
import {BrowserRouterProps, MemoryRouter} from 'react-router-dom';
import ProvinceMaster from './ProvinceMaster';

describe('ProvinceMaster', () => {
  it('renders without crashing', async () => {
    const node: ReactElement<BrowserRouterProps> = (
      <MemoryRouter>
        <ProvinceMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
