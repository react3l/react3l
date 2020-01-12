import {configureI18Next} from 'config/i18next.test-config';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import NumberRange from './NumberRange';

describe('NumberRange', () => {
  it('renders without crashing', () => {
    configureI18Next()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(
          <MemoryRouter>
            <NumberRange/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
