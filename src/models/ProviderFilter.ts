import {IdFilter, StringFilter} from 'core/filters';
import {ModelFilter} from 'core/models';

export class ProviderFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public providerTypeId?: IdFilter = new IdFilter();

  public value?: StringFilter = new StringFilter();
}
