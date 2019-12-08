import {AxiosResponse} from 'axios';
import {Repository} from 'core/repositories';
import {url} from 'helpers/url';
import kebabCase from 'lodash/kebabCase';
import {Province} from 'models/Province';
import {ProvinceSearch} from 'models/ProvinceSearch';

export class ProvinceMasterRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(url('/api/provinces'));
  }

  public list = (provinceSearch?: ProvinceSearch): Promise<Province[]> => {
    return this.http.get<Province[]>(kebabCase(this.list.name))
      .then((response: AxiosResponse<Province[]>) => {
        return response.data.map((province: Province) => {
          return new Province(province);
        });
      });
  };
}

export default new ProvinceMasterRepository();
