import {useBooleanState} from './use-boolean-state';
import {useHOFChangeHandlers} from './use-hof-change-handlers';
import {useStringState} from './use-string-state';
import {useSpecificField} from 'services/common-service/use-specific-field';
import {useInfinityList} from 'services/common-service/use-infinity-list';

export const commonService = {
  useBooleanState,

  useStringState,

  useHOFChangeHandlers,

  useSpecificField,

  useInfinityList,
}
