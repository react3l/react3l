import {configTests} from 'core/config/config-tests';
import {StringFilter} from 'core/filters';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';

describe('AdvancedStringFilter', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
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
});
