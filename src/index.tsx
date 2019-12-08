import initialGlobalState, {GlobalState} from 'config/global';
import {routes} from 'config/routes';
import * as serviceWorker from 'config/service-worker';
import {App, AppLoading} from 'core/components';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import React, {setGlobal} from 'reactn';
import 'styles';

setGlobal<GlobalState>(initialGlobalState)
  .then(() => {
    ReactDOM.render(
      <BrowserRouter>
        <AppLoading>
          <App routes={routes}/>
        </AppLoading>
      </BrowserRouter>,
      document.getElementById('root'),
    );
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
