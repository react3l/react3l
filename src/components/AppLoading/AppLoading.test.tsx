import {GlobalState} from 'core/config';
import initialGlobalState from 'core/config/global';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import React from 'reactn';
import AppLoading from './AppLoading';

describe('AppLoading', () => {
  it('renders without crashing', () => {
    React.setGlobal<GlobalState>(initialGlobalState)
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
