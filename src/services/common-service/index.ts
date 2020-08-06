import {useBooleanState} from './use-boolean-state';
import {useHOFChangeHandlers} from './use-hof-change-handlers';
import {useStringState} from './use-string-state';
import {useSpecificField} from './use-specific-field';
import {useInfinityList} from './use-infinity-list';
import {useNumberState} from './use-number-state';
import {useSubscription} from 'services/common-service/use-subscription';

export const commonService = {
  useBooleanState,

  useStringState,

  useHOFChangeHandlers,

  useSpecificField,

  useInfinityList,

  useNumberState,

  useSubscription,
}
