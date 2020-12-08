import {ErrorMap} from './ErrorMap';

export interface ModelWithErrorMap {
  errors?: ErrorMap<this>;
}
