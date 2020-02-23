import {AxiosResponse} from 'axios';
import {API_PROVINCE_MASTER_ROUTE} from 'config/api-consts';
import {Repository} from 'core/repositories';
import {PureModelData} from 'core/types';
import kebabCase from 'lodash/kebabCase';
import {Province} from 'models/Province';
import {ProvinceFilter} from 'models/ProvinceFilter';
import nameof from 'ts-nameof.macro';

export class ProvinceMasterRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(API_PROVINCE_MASTER_ROUTE);
  }

  public count = (provinceFilter: ProvinceFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), provinceFilter)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public list = (provinceFilter: ProvinceFilter): Promise<Province[]> => {
    return this.http.post<Province[]>(kebabCase(nameof(this.list)), provinceFilter)
      .then((response: AxiosResponse<Array<PureModelData<Province>>>) => {
        return response.data.map((province: PureModelData<Province>) => {
          return Province.clone<Province>(province);
        });
      });
  };

  public get = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameof(this.get)), province)
      .then((response: AxiosResponse<PureModelData<Province>>) => {
        return Province.clone<Province>(response.data);
      });
  };
}

export const provinceMasterRepository: ProvinceMasterRepository = new ProvinceMasterRepository();
