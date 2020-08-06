import React from 'react';
import {Subscription} from 'rxjs';

/**
 * Use a subscription state to cancel async tasks
 */
export function useSubscription() {
  const [subscription] = React.useState<Subscription>(new Subscription());

  React.useEffect(
    () => {
      return function cleanup() {
        subscription.unsubscribe();
      }
    },
    [subscription],
  );

  return [
    subscription,
  ];
}
