import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import ContentModal from './ContentModal';
import {RoleFilter} from '../../models/RoleFilter';
import {configTests} from '../../setupTests';

describe('ContentModal', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        const data = {
          filter: new RoleFilter(),
          setFilter() {
            this.filter = new RoleFilter();
          },
          list: [],
          setList() {
            this.list = [];
          },
        };
        ReactDOM.render(
          <MemoryRouter>
            <ContentModal
              title="test title"
              filter={data.filter}
              setFilter={data.setFilter}
              list={data.list}
              loading={false}
              selectedList={data.list}
              setSelectedList={data.setList}
              total={data.list.length}
            />
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
