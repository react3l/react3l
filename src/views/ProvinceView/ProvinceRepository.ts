import {Repository} from 'core/repositories/Repository';
import {httpConfig} from 'config/http';
import {url} from 'core/helpers/string';
import {API_BASE_URL} from 'core/config';
import {API_PROVINCE_ROUTE} from 'config/api-consts';
import {ProvinceFilter} from 'models/ProvinceFilter';
import {Province} from 'models/Province';
import kebabCase from 'lodash/kebabCase';
import nameof from 'ts-nameof.macro';
import {AxiosResponse} from 'axios';
import {BatchId, PureModelData} from 'react3l';
import {ProvinceType} from 'models/ProvinceType';

export class ProvinceRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_PROVINCE_ROUTE));
  }

  public list = (provinceFilter?: ProvinceFilter): Promise<Province[]> => {
    return this.http.post(kebabCase(nameof(this.list)), provinceFilter)
      .then((response: AxiosResponse<Province[]>) => {
        return response.data?.map((province: PureModelData<Province>) => Province.clone<Province>(province));
      });
  };

  public delete = (province: Province): Promise<Province> => {
    return this.http.post(kebabCase(nameof(this.delete)), province)
      .then((response: AxiosResponse<Province>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public create = (province: Province): Promise<Province> => {
    return this.http.post(kebabCase(nameof(this.create)), province)
      .then((response: AxiosResponse<Province>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public update = (province: Province): Promise<Province> => {
    return this.http.post(kebabCase(nameof(this.update)), province)
      .then((response: AxiosResponse<Province>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public save = (province: Province): Promise<Province> => {
    return !province.id ? this.create(province) : this.update(province);
  };

  public get = (id: number | string): Promise<Province> => {
    return this.http.post(kebabCase(nameof(this.get)), {
      id,
    })
      .then((response: AxiosResponse<Province>) => {
        return Province.clone<Province>(response.data);
      });
  };

  public bulkDelete = (idList: BatchId): Promise<void> => {
    return this.http.post(kebabCase(nameof(this.bulkDelete)), idList)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public count = (provinceFilter?: ProvinceFilter): Promise<number> => {
    return this.http.post(kebabCase(nameof(this.count)), provinceFilter)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public singleListProvinceType = (): Promise<ProvinceType[]> => {
    return this.http.post<ProvinceType[]>(kebabCase(nameof(this.singleListProvinceType)), {})
      .then((response: AxiosResponse<ProvinceType[]>) => {
        return response.data?.map((provinceType: PureModelData<ProvinceType>) => {
          return ProvinceType.clone<ProvinceType>(provinceType);
        });
      });
  };

  public import = (file: File, name: string = nameof(file)): Promise<void> => {
    const formData: FormData = new FormData();
    formData.append(name, file);
    return this.http.post<void>(kebabCase(nameof(this.import)), formData)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };
}

export const provinceRepository: ProvinceRepository = new ProvinceRepository();
