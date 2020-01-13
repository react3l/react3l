import {DateFilter} from 'core/filters';
import {configTests} from 'helpers/config-tests';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import AdvancedDateFilter from './AdvancedDateFilter';

describe('AdvancedDateFilter', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(
          <MemoryRouter>
            <AdvancedDateFilter filter={new DateFilter()}/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
