import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import AdvancedDateFilter from './AdvancedDateFilter';
import {DateFilter} from 'core/filters';
import {configTests} from 'setupTests';

describe('AdvancedDateFilter', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        const filter: DateFilter = new DateFilter();
        ReactDOM.render(
          <MemoryRouter>
            <AdvancedDateFilter filter={filter}
                                filterType={nameof(filter.equal)}/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
