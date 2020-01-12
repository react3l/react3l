import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {configureI18Next} from '../../config/i18next.test-config';
import DefaultLayout from './DefaultLayout';

describe('DefaultLayout', () => {
  it('renders without crashing', () => {
    configureI18Next()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(
          <MemoryRouter>
            <DefaultLayout/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
