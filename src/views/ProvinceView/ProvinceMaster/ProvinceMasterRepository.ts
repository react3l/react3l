import {AxiosResponse} from 'axios';
import {Model} from 'core/models';
import {Repository} from 'core/repositories';
import {url} from 'helpers/url';
import kebabCase from 'lodash/kebabCase';
import {Province} from 'models/Province';
import {ProvinceSearch} from 'models/ProvinceSearch';
import {ProvinceType} from 'models/ProvinceType';
import nameof from 'ts-nameof.macro';

export class ProvinceMasterRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(url('/api/province'));
  }

  public list = (provinceSearch?: ProvinceSearch): Promise<Province[]> => {
    return this.http.post<Province[]>(kebabCase(nameof(this.list)), provinceSearch)
      .then((response: AxiosResponse<Province[]>) => {
        return response.data.map((province: Province) => {
          return Province.clone<Province>(province);
        });
      });
  };

  public listProvinceType = (): Promise<ProvinceType[]> => {
    return this.http.post<ProvinceType[]>(kebabCase(nameof(this.listProvinceType)))
      .then((response: AxiosResponse<ProvinceType[]>) => {
        return response.data.map((provinceType: ProvinceType) => {
          return ProvinceType.clone<ProvinceType>(provinceType);
        });
      });
  };

  public count = (provinceSearch?: ProvinceSearch): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), provinceSearch)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public delete = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameof(this.delete)), province)
      .then((response: AxiosResponse<Province>) => {
        return Model.clone<Province>(response.data);
      });
  };
}

export default new ProvinceMasterRepository();
