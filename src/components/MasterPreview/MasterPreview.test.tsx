import {configTests} from 'core/config';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import MasterPreview from './MasterPreview';

describe('MasterPreview', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter>
          <MasterPreview/>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
