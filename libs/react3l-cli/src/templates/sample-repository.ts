import {Repository} from 'react3l-common';

export class SampleRepository extends Repository {
  constructor() {
    super();
    this.baseURL = '<BASE_URL>';
  }
}

export const sampleRepository: SampleRepository = new SampleRepository();
