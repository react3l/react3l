import {AxiosResponse} from 'axios';

import {API_COLLECTION_MASTER_ROUTE} from 'config/api-consts';
import {url} from 'core/helpers/url';
import {Model} from 'core/models';
import {Repository} from 'core/repositories';
import {PureModelData} from 'core/types';
import kebabCase from 'lodash/kebabCase';
import {Collection} from 'models/Collection';
import {CollectionStatus} from 'models/CollectionStatus';
import {CollectionStatusSearch} from 'models/CollectionStatusSearch';
import nameof from 'ts-nameof.macro';

export class CollectionDetailRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(url(API_COLLECTION_MASTER_ROUTE));
  }

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

  public update = (collection: Collection): Promise<Collection> => {
    return this.http.post<Collection>(kebabCase(nameof(this.update)), collection)
      .then((response: AxiosResponse<Collection>) => {
        return Collection.clone<Collection>(response.data);
      });
  };

  public create = (collection: Collection): Promise<Collection> => {
    return this.http.post<Collection>(kebabCase(nameof(this.create)), collection)
      .then((response: AxiosResponse<Collection>) => {
        return Collection.clone<Collection>(response.data);
      });
  };

  public save = (collection: Collection): Promise<Collection> => {
    if (collection.id) {
      return this.update(collection);
    }
    return this.create(collection);
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

export default new CollectionDetailRepository();
