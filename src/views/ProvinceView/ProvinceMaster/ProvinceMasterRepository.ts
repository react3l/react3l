import {AxiosResponse} from 'axios';
import {Repository} from 'core/repositories';
import {url} from 'helpers/url';
import kebabCase from 'lodash/kebabCase';
import {Province} from 'models/Province';
import {ProvinceSearch} from 'models/ProvinceSearch';
import nameOf from 'ts-nameof.macro';

export class ProvinceMasterRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(url('/api/provinces'));
  }

  public list = (provinceSearch?: ProvinceSearch): Promise<Province[]> => {
    return this.http.get<Province[]>(
      kebabCase(nameOf(this.list)),
      {
        params: provinceSearch,
      },
    )
      .then((response: AxiosResponse<Province[]>) => {
        return response.data.map((province: Province) => {
          return Province.clone<Province>(province);
        });
      });
  };

  public count = (provinceSearch?: ProvinceSearch): Promise<number> => {
    return this.http.get<number>(
      kebabCase(nameOf(this.count)),
      {
        params: provinceSearch,
      },
    )
      .then((response: AxiosResponse<number>) => response.data);
  };
}

export default new ProvinceMasterRepository();
