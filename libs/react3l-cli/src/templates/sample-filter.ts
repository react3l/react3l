import {ModelFilter} from 'react3l-common';
import {IdFilter} from 'react3l-advanced-filters';

export class SampleFilter extends ModelFilter {
  public idFilter: IdFilter = new IdFilter();
}
