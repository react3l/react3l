import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import AdvancedNumberFilter from './AdvancedNumberFilter';
import {NumberFilter} from 'core/filters';
import {configTests} from 'setupTests';

describe('AdvancedNumberFilter', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        const filter = new NumberFilter();
        ReactDOM.render(
          <MemoryRouter>
            <AdvancedNumberFilter filter={filter} filterType={nameof(filter.equal)}/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
