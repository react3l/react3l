import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import AdvancedStringFilter from './AdvancedStringFilter';
import {StringFilter} from 'core/filters';

describe('AdvancedStringFilter', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const filter = new StringFilter();
    ReactDOM.render(
      <MemoryRouter>
        <AdvancedStringFilter filter={filter} filterType={nameof(filter.equal)}/>
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
