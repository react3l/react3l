import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {ApplicationUser} from 'models/ApplicationUser';
import RoleContentTable from './RoleContentTable';
import {configTests} from '../../../../setupTests';

describe('RoleContentTable', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        const data = {
          user: new ApplicationUser(),
          setUser() {
            this.user = new ApplicationUser();
          },
        };
        ReactDOM.render(
          <MemoryRouter>
            <RoleContentTable field="roles" model={data.user} setModel={data.setUser}/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
