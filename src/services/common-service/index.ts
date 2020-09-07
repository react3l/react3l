import { useBooleanState } from './use-boolean-state';
import { useHOFChangeHandlers } from './use-hof-change-handlers';
import { useInfinityList } from './use-infinity-list';
import { useListState } from './use-list-state';
import { useNumberState } from './use-number-state';
import { useSpecificField } from './use-specific-field';
import { useStringState } from './use-string-state';
import { useSubscription } from './use-subscription';

export const commonService = {
  useBooleanState,

  useStringState,

  useHOFChangeHandlers,

  useSpecificField,

  useInfinityList,

  useNumberState,

  useSubscription,

  useListState,
};
