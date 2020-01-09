import {AxiosResponse} from 'axios';

import {API_COLLECTION_MASTER_ROUTE} from 'config/api-consts';
import {url} from 'core/helpers/url';
import {Model} from 'core/models';
import {Repository} from 'core/repositories';
import {PureModelData} from 'core/types';
import kebabCase from 'lodash/kebabCase';
import {Collection} from 'models/Collection';
import {CollectionSearch} from 'models/CollectionSearch';
import {CollectionStatus} from 'models/CollectionStatus';
import {CollectionStatusSearch} from 'models/CollectionStatusSearch';
import nameof from 'ts-nameof.macro';

export class CollectionMasterRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(url(API_COLLECTION_MASTER_ROUTE));
  }

  public count = (collectionSearch: CollectionSearch): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), collectionSearch)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public list = (collectionSearch: CollectionSearch): Promise<Collection[]> => {
    return this.http.post<Collection[]>(kebabCase(nameof(this.list)), collectionSearch)
      .then((response: AxiosResponse<Array<PureModelData<Collection>>>) => {
        return response.data.map((collection: PureModelData<Collection>) => {
          return Collection.clone<Collection>(collection);
        });
      });
  };

  public get = (collection: Collection): Promise<Collection> => {
    return this.http.post<Collection>(kebabCase(nameof(this.get)), collection)
      .then((response: AxiosResponse<Collection>) => {
        return Collection.clone<Collection>(response.data);
      });
  };

  public delete = (collection: Collection): Promise<Collection> => {
    return this.http.post<Collection>(kebabCase(nameof(this.delete)), collection)
      .then((response: AxiosResponse<Collection>) => {
        return Model.clone<Collection>(response.data);
      });
  };

  public singleListCollectionStatus = (): Promise<CollectionStatus[]> => {
    return this.http.post<CollectionStatus[]>(kebabCase(nameof(this.singleListCollectionStatus)), new CollectionStatusSearch())
      .then((response: AxiosResponse<Array<PureModelData<CollectionStatus>>>) => {
        return response.data.map((collectionStatus: PureModelData<CollectionStatus>) => {
          return CollectionStatus.clone<CollectionStatus>(collectionStatus);
        });
      });
  };
}

export default new CollectionMasterRepository();
