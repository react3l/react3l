import initialI18NextConfig from 'config/i18next';
import {routes} from 'config/routes';
import {App, AppLoading} from 'core/components';
import initialGlobalState, {GlobalState} from 'core/config/global';
import {changeLanguage} from 'core/helpers';
import i18next from 'i18next';
import ReactDOM from 'react-dom';
import {initReactI18next} from 'react-i18next';
import {BrowserRouter} from 'react-router-dom';
import React, {setGlobal} from 'reactn';
import * as serviceWorker from 'service-worker';
import 'styles';

Promise.all([
  i18next.use(initReactI18next)
    .init(initialI18NextConfig)
    .then(() => {
      return changeLanguage('vi');
    }),
  setGlobal<GlobalState>(initialGlobalState),
])
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
