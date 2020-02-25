import {configTests} from 'core/config';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import ProvinceView from 'views/DefaultViews/ProvinceView/ProvinceView';

describe('ProvinceView', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter>
          <ProvinceView/>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
