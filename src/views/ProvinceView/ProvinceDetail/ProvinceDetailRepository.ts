import {AxiosResponse} from 'axios';
import {Repository} from 'core/repositories';
import {url} from 'helpers';
import kebabCase from 'lodash/kebabCase';
import {Province} from 'models/Province';
import nameOf from 'ts-nameof.macro';

export class ProvinceDetailRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(url('/api/provinces'));
  }

  public get = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameOf(this.get)), province)
      .then((response: AxiosResponse<Province>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public update = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameOf(this.update)), province)
      .then((response: AxiosResponse<Province>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public create = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameOf(this.create)), province)
      .then((response: AxiosResponse<Province>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public save = (province: Province): Promise<Province> => {
    if (province.id) {
      return this.update(province);
    }
    return this.create(province);
  };

  public delete = (province: Province): Promise<Province> => {
    return this.http.post<Province>(kebabCase(nameOf(this.delete)), province)
      .then((response: AxiosResponse<Province>) => {
        return Province.clone<Province>(response.data);
      });
  };
}

export default new ProvinceDetailRepository();
