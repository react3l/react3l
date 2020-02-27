import {Repository} from 'core/repositories/Repository';
import {PROVINCE_MASTER_ROUTE} from 'config/api-consts';
import {ProvinceFilter} from 'models/ProvinceFilter';
import {Province} from 'models/Province';
import kebabCase from 'lodash/kebabCase';
import {AxiosResponse} from 'axios';
import {PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import nameof from 'ts-nameof.macro';
import {url} from 'core/helpers/string';
import {API_BASE_URL} from 'core/config';

export class ProvinceMasterRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, PROVINCE_MASTER_ROUTE));
  }

  public list = (provinceFilter?: ProvinceFilter): Promise<Province[]> => {
    return this.http.post(kebabCase(nameof(this.list)), provinceFilter)
      .then((response: AxiosResponse<Province[]>) => {
        return response.data?.map((province: PureModelData<Province>) => Province.clone<Province>(province));
      });
  };

  public count = (provinceFilter?: ProvinceFilter): Promise<number> => {
    return this.http.post(kebabCase(nameof(this.count)), provinceFilter)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };
}

export const provinceMasterRepository: ProvinceMasterRepository = new ProvinceMasterRepository();
