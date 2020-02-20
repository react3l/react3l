import {configTests} from 'core/config/config-tests';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import React from 'reactn';
import AppLoading from './AppLoading';

describe('AppLoading', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(
          <MemoryRouter>
            <AppLoading/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
