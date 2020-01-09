import {AxiosResponse} from 'axios';

import {API_PRODUCT_MASTER_ROUTE} from 'config/api-consts';
import {url} from 'core/helpers/url';
import {Model} from 'core/models';
import {Repository} from 'core/repositories';
import {PureModelData} from 'core/types';
import kebabCase from 'lodash/kebabCase';
import {Brand} from 'models/Brand';
import {BrandSearch} from 'models/BrandSearch';
import {Category} from 'models/Category';
import {CategorySearch} from 'models/CategorySearch';
import {Merchant} from 'models/Merchant';
import {MerchantSearch} from 'models/MerchantSearch';
import {Product} from 'models/Product';
import {ProductSearch} from 'models/ProductSearch';
import {ProductStatus} from 'models/ProductStatus';
import {ProductStatusSearch} from 'models/ProductStatusSearch';
import {ProductType} from 'models/ProductType';
import {ProductTypeSearch} from 'models/ProductTypeSearch';
import nameof from 'ts-nameof.macro';

export class ProductMasterRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(url(API_PRODUCT_MASTER_ROUTE));
  }

  public count = (productSearch: ProductSearch): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), productSearch)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public list = (productSearch: ProductSearch): Promise<Product[]> => {
    return this.http.post<Product[]>(kebabCase(nameof(this.list)), productSearch)
      .then((response: AxiosResponse<Array<PureModelData<Product>>>) => {
        return response.data.map((product: PureModelData<Product>) => {
          return Product.clone<Product>(product);
        });
      });
  };

  public get = (product: Product): Promise<Product> => {
    return this.http.post<Product>(kebabCase(nameof(this.get)), product)
      .then((response: AxiosResponse<Product>) => {
        return Product.clone<Product>(response.data);
      });
  };

  public delete = (product: Product): Promise<Product> => {
    return this.http.post<Product>(kebabCase(nameof(this.delete)), product)
      .then((response: AxiosResponse<Product>) => {
        return Model.clone<Product>(response.data);
      });
  };

  public singleListBrand = (brandSearch: BrandSearch): Promise<Brand[]> => {
    return this.http.post<Brand[]>(kebabCase(nameof(this.singleListBrand)), brandSearch)
      .then((response: AxiosResponse<Array<PureModelData<Brand>>>) => {
        return response.data.map((brand: PureModelData<Brand>) => {
          return Brand.clone<Brand>(brand);
        });
      });
  };

  public singleListCategory = (categorySearch: CategorySearch): Promise<Category[]> => {
    return this.http.post<Category[]>(kebabCase(nameof(this.singleListCategory)), categorySearch)
      .then((response: AxiosResponse<Array<PureModelData<Category>>>) => {
        return response.data.map((category: PureModelData<Category>) => {
          return Category.clone<Category>(category);
        });
      });
  };

  public singleListMerchant = (merchantSearch: MerchantSearch): Promise<Merchant[]> => {
    return this.http.post<Merchant[]>(kebabCase(nameof(this.singleListMerchant)), merchantSearch)
      .then((response: AxiosResponse<Array<PureModelData<Merchant>>>) => {
        return response.data.map((merchant: PureModelData<Merchant>) => {
          return Merchant.clone<Merchant>(merchant);
        });
      });
  };

  public singleListProductStatus = (): Promise<ProductStatus[]> => {
    return this.http.post<ProductStatus[]>(kebabCase(nameof(this.singleListProductStatus)), new ProductStatusSearch())
      .then((response: AxiosResponse<Array<PureModelData<ProductStatus>>>) => {
        return response.data.map((productStatus: PureModelData<ProductStatus>) => {
          return ProductStatus.clone<ProductStatus>(productStatus);
        });
      });
  };

  public singleListProductType = (): Promise<ProductType[]> => {
    return this.http.post<ProductType[]>(kebabCase(nameof(this.singleListProductType)), new ProductTypeSearch())
      .then((response: AxiosResponse<Array<PureModelData<ProductType>>>) => {
        return response.data.map((productType: PureModelData<ProductType>) => {
          return ProductType.clone<ProductType>(productType);
        });
      });
  };
}

export default new ProductMasterRepository();
