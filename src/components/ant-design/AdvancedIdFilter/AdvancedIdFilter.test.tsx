import {configTests} from 'core/config/config-tests';
import {IdFilter} from 'core/filters';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import AdvancedIdFilter from 'components/ant-design/AdvancedIdFilter/AdvancedIdFilter';

describe('AdvancedIdFilter', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(
          <MemoryRouter>
            <AdvancedIdFilter filter={new IdFilter()}/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
