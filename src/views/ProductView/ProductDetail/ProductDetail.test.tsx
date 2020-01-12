import {configureI18Next} from 'config/i18next.test-config';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import ProductDetail from './ProductDetail';

describe('ProductDetail', () => {
  it('renders without crashing', () => {
    configureI18Next()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(
          <MemoryRouter>
            <ProductDetail/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
