import {AxiosResponse} from 'axios';
import {API_PRODUCT_MASTER_ROUTE} from 'config/api-consts';
import {url} from 'core/helpers/url';
import {Model} from 'core/models';
import {Repository} from 'core/repositories';
import kebabCase from 'lodash/kebabCase';
import {Brand} from 'models/Brand';
import {Category} from 'models/Category';
import {Merchant} from 'models/Merchant';
import {Product} from 'models/Product';
import {ProductSearch} from 'models/ProductSearch';
import {ProductStatus} from 'models/ProductStatus';
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
      .then((response: AxiosResponse<Product[]>) => {
        return response.data.map((product: Product) => {
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

  public singleListBrand = (): Promise<Brand[]> => {
    return this.http.post<Brand[]>(kebabCase(nameof(this.singleListBrand)))
      .then((response: AxiosResponse<Brand[]>) => {
        return response.data.map((brand: Brand) => {
          return Brand.clone<Brand>(brand);
        });
      });
  };

  public singleListCategory = (): Promise<Category[]> => {
    return this.http.post<Category[]>(kebabCase(nameof(this.singleListCategory)))
      .then((response: AxiosResponse<Category[]>) => {
        return response.data.map((category: Category) => {
          return Category.clone<Category>(category);
        });
      });
  };

  public singleListMerchant = (): Promise<Merchant[]> => {
    return this.http.post<Merchant[]>(kebabCase(nameof(this.singleListMerchant)))
      .then((response: AxiosResponse<Merchant[]>) => {
        return response.data.map((merchant: Merchant) => {
          return Merchant.clone<Merchant>(merchant);
        });
      });
  };

  public singleListProductStatus = (): Promise<ProductStatus[]> => {
    return this.http.post<ProductStatus[]>(kebabCase(nameof(this.singleListProductStatus)))
      .then((response: AxiosResponse<ProductStatus[]>) => {
        return response.data.map((productStatus: ProductStatus) => {
          return ProductStatus.clone<ProductStatus>(productStatus);
        });
      });
  };

  public singleListProductType = (): Promise<ProductType[]> => {
    return this.http.post<ProductType[]>(kebabCase(nameof(this.singleListProductType)), new ProductTypeSearch())
      .then((response: AxiosResponse<ProductType[]>) => {
        return response.data.map((productType: ProductType) => {
          return ProductType.clone<ProductType>(productType);
        });
      });
  };
}

export default new ProductMasterRepository();
