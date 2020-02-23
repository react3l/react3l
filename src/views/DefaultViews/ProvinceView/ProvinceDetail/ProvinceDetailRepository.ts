import {API_PROVINCE_DETAIL_ROUTE} from 'config/api-consts';
import {Repository} from 'core/repositories';

export class ProvinceDetailRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(API_PROVINCE_DETAIL_ROUTE);
  }
}

export const provinceDetailRepository: ProvinceDetailRepository = new ProvinceDetailRepository();
