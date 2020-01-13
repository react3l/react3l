import {configTests} from 'helpers/config-tests';
import {Model} from 'core/models';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import MasterTableActions from './MasterTableActions';

describe('MasterTableActions', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        const model: Model = new Model();
        const id: number = 1;
        ReactDOM.render(
          <MemoryRouter>
            <MasterTableActions
              model={model}
              id={id}
            />
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
