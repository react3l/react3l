import {MemoryRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import AdvancedFilter from './AdvancedFilter';

describe('AdvancedFilter', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
      <AdvancedFilter/>
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

