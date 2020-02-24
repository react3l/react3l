import {translate as translateMarker} from 'core/helpers';
import {RouteConfig} from 'react-router-config';

export function translateBreadcrumbs(routes: RouteConfig[], translate: (str: string) => string = translateMarker) {
  let translatedRoutes: RouteConfig[] = [];
  routes?.forEach((route: RouteConfig) => {
    if (route?.routes instanceof Array) {
      translatedRoutes = [
        ...translatedRoutes,
        ...translateBreadcrumbs(route.routes, translate),
      ];
    }
    translatedRoutes = [
      ...translatedRoutes,
      {
        path: route.path,
        name: translate(route.name),
        exact: route.exact,
      },
    ];
  });
  return translatedRoutes;
}
