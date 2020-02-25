import {AxiosResponse} from 'axios';

import {API_PROVINCE_DETAIL_ROUTE} from 'config/api-consts';
import {url} from 'core/helpers/url';
import {Model} from 'core/models';
import {Repository} from 'core/repositories';
import {PureModelData} from 'core/types';
import kebabCase from 'lodash/kebabCase';
import {Province} from 'models/Province';
import nameof from 'ts-nameof.macro';

export class ProvinceDetailRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(url(API_PROVINCE_DETAIL_ROUTE));
  }

  public get = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameof(this.get)), province)
      .then((response: AxiosResponse<PureModelData<Province>>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public create = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameof(this.create)), province)
      .then((response: AxiosResponse<PureModelData<Province>>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public update = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameof(this.update)), province)
      .then((response: AxiosResponse<PureModelData<Province>>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public delete = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameof(this.delete)), province)
      .then((response: AxiosResponse<PureModelData<Province>>) => {
        return Model.clone<Province>(response.data);
      });
  };

  public save = (province: Province): Promise<Province> => {
    if (province.id) {
      return this.update(province);
    }
    return this.create(province);
  };

}

export const provinceDetailRepository: ProvinceDetailRepository = new ProvinceDetailRepository();
