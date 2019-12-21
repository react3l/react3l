import {MemoryRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
  it('renders without crashing', () => {
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

