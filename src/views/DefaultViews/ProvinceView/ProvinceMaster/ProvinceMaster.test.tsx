import {configTests} from 'core/config';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import ProvinceMaster from 'views/DefaultViews/ProvinceView/ProvinceMaster/ProvinceMaster';

describe('ProvinceMaster', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter>
          <ProvinceMaster/>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
