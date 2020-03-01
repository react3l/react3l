import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import AdvancedIdFilter from './AdvancedIdFilter';
import {IdFilter} from 'core/filters';
import {configTests} from 'setupTests';

describe('AdvancedIdFilter', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        const filter: IdFilter = new IdFilter();
        ReactDOM.render(
          <MemoryRouter>
            <AdvancedIdFilter filter={filter} filterType={nameof(filter.equal)}/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
