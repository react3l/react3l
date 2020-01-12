import {configureI18Next} from 'config/i18next.test-config';
import {Model} from 'core/models';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import CollectionContentTable from './CollectionContentTable';

describe('CollectionContentTable', () => {
  it('renders without crashing', () => {
    configureI18Next()
      .then(() => {
        const div = document.createElement('div');
        const model: Model = new Model();
        const setModel: () => void = () => { /* Do nothing */
        };
        ReactDOM.render(
          <MemoryRouter>
            <CollectionContentTable
              model={model}
              setModel={setModel}
              field="name"
            />
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
