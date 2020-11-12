import {Subscription} from 'rxjs';
import React from 'react';

export function useSubscription(): Subscription {
  const subscription: Subscription = React.useRef<Subscription>(
    new Subscription(),
  ).current;

  React.useEffect(() => {
    return () => {
      subscription.unsubscribe();
    };
  }, [subscription]);

  return subscription;
}
