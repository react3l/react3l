import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { translationService } from '@react3l/react3l/services';
import { commonService } from '@react3l/react3l/services/common-service';

export default {
  title: 'Common State/Subscription',
};

const SubscriptionHook = (): ReactElement => {
  const [subscription] = commonService.useSubscription();

  const [translate] = useTranslation();

  React.useEffect(
    () => {
      return function cleanup() {
        const {closed} = subscription;
        if (closed) {
          message.info(translate('subscription.unsubscribeSuccessfully'));
        }
      };
    },
    [subscription, subscription.closed, translate],
  );

  return null;
};

export function useSubscription() {
  const [mounted, setMounted] = React.useState<boolean>(true);

  const handleUnmount = React.useCallback(
    () => {
      setMounted(false);
    },
    [],
  );

  return (
    <>
      {mounted && (
        <SubscriptionHook/>
      )}
      <Button onClick={handleUnmount}>
        {translationService.translate('subscription.unmount')}
      </Button>
    </>
  );
}
