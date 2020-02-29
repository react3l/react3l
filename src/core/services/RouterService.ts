import React from 'react';
import {useHistory} from 'react-router';
import {generalLanguageKeys} from 'config/consts';
import {Id} from 'react3l';
import path from 'path';
import nameof from 'ts-nameof.macro';

export class RouterService {
  public useGoBack(): [
    () => void
  ] {
    const history = useHistory();

    return [
      React.useCallback(
        () => {
          history.goBack();
        },
        [history],
      ),
    ];
  }

  public useMasterNavigation(baseRoute: string): [
    () => void,
    (id: Id) => () => void,
  ] {
    const history = useHistory();

    const handleGoCreate = React.useCallback(
      () => {
        history.push(path.join(baseRoute, nameof(generalLanguageKeys.actions.create)));
      },
      [baseRoute, history],
    );

    const handleGoDetail = React.useCallback(
      (id: Id) => {
        return () => {
          history.push(path.join(baseRoute, `${id}`));
        };
      },
      [baseRoute, history],
    );

    return [
      handleGoCreate,
      handleGoDetail,
    ];
  }
}

export const routerService: RouterService = new RouterService();
