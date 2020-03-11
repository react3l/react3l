import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import ApplicationUserDetail from 'views/ApplicationUserView/ApplicationUserDetail/ApplicationUserDetail';
import {configTests} from '../../../setupTests';

describe('ApplicationUserDetail', () => {
  it('renders without crashing', async () => {
    await configTests();
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ApplicationUserDetail/>
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
