import {StringFilter} from 'core/filters';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import AdvancedStringFilter from './AdvancedStringFilter';

describe('AdvancedStringFilter', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const filter: StringFilter = new StringFilter();
    ReactDOM.render(
      <MemoryRouter>
        <AdvancedStringFilter filter={filter}/>
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
