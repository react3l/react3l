import {configTests} from 'helpers/config-tests';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(
          <MemoryRouter>
            <RadioGroup/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
