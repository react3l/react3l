import {Repository} from 'core/repositories/Repository';
import {httpConfig} from 'config/http';
import {url} from 'core/helpers/string';
import {API_BASE_URL} from 'core/config';
import {API_APPLICATION_USER_ROUTE} from 'config/api-consts';
import {ApplicationUserFilter} from 'models/ApplicationUserFilter';
import {ApplicationUser} from 'models/ApplicationUser';
import kebabCase from 'lodash/kebabCase';
import nameof from 'ts-nameof.macro';
import {AxiosResponse} from 'axios';
import {BatchId, PureModelData} from 'react3l';
import {UserStatus} from 'models/UserStatus';

export class ApplicationUserRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_APPLICATION_USER_ROUTE));
  }

  public list = (applicationUserFilter?: ApplicationUserFilter): Promise<ApplicationUser[]> => {
    return this.http.post(kebabCase(nameof(this.list)), applicationUserFilter)
      .then((response: AxiosResponse<ApplicationUser[]>) => {
        return response.data?.map((applicationUser: PureModelData<ApplicationUser>) => ApplicationUser.clone<ApplicationUser>(applicationUser));
      });
  };

  public delete = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return this.http.post(kebabCase(nameof(this.delete)), applicationUser)
      .then((response: AxiosResponse<ApplicationUser>) => {
        return ApplicationUser.clone<ApplicationUser>(response.data);
      });
  };

  public create = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return this.http.post(kebabCase(nameof(this.create)), applicationUser)
      .then((response: AxiosResponse<ApplicationUser>) => {
        return ApplicationUser.clone<ApplicationUser>(response.data);
      });
  };

  public update = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return this.http.post(kebabCase(nameof(this.update)), applicationUser)
      .then((response: AxiosResponse<ApplicationUser>) => {
        return ApplicationUser.clone<ApplicationUser>(response.data);
      });
  };

  public save = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return !applicationUser.id ? this.create(applicationUser) : this.update(applicationUser);
  };

  public get = (id: number | string): Promise<ApplicationUser> => {
    return this.http.post(kebabCase(nameof(this.get)), {
      id,
    })
      .then((response: AxiosResponse<ApplicationUser>) => {
        return ApplicationUser.clone<ApplicationUser>(response.data);
      });
  };

  public bulkDelete = (idList: BatchId): Promise<void> => {
    return this.http.post(kebabCase(nameof(this.bulkDelete)), idList)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
  };

  public count = (applicationUserFilter?: ApplicationUserFilter): Promise<number> => {
    return this.http.post(kebabCase(nameof(this.count)), applicationUserFilter)
      .then((response: AxiosResponse<number>) => {
        return response.data;
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

  public singleListUserStatus = (): Promise<UserStatus[]> => {
    return this.http.post<UserStatus[]>(kebabCase(nameof(this.singleListUserStatus)), {})
      .then((response: AxiosResponse<UserStatus[]>) => {
        return response.data?.map((userStatus: PureModelData<UserStatus>) => {
          return UserStatus.clone<UserStatus>(userStatus);
        });
      });
  };
}

export const applicationUserRepository: ApplicationUserRepository = new ApplicationUserRepository();
