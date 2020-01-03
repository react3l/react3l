import {AxiosResponse} from 'axios';
import {API_PRODUCT_DETAIL_ROUTE} from 'config/api-consts';
import {url} from 'core/helpers/url';
import {Repository} from 'core/repositories';
import kebabCase from 'lodash/kebabCase';
import {Merchant} from 'models/Merchant';
import {MerchantSearch} from 'models/MerchantSearch';
import {Product} from 'models/Product';
import {ProductSearch} from 'models/ProductSearch';
import {ProductStatus} from 'models/ProductStatus';
import {ProductStatusSearch} from 'models/ProductStatusSearch';
import {ProductType} from 'models/ProductType';
import {ProductTypeSearch} from 'models/ProductTypeSearch';
import nameof from 'ts-nameof.macro';

export class ProductDetailRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL(url(API_PRODUCT_DETAIL_ROUTE));
  }

  public list = (productSearch: ProductSearch): Promise<Product[]> => {
    return this.http.post<Product[]>(kebabCase(nameof(this.list)), productSearch)
      .then((response: AxiosResponse<Product[]>) => {
        return response.data.map((product: Product) => {
          return Product.clone<Product>(product);
        });
      });
  };

  public listProductType = (): Promise<ProductType[]> => {
    return this.http.post<ProductType[]>(kebabCase(nameof(this.listProductType)))
      .then((response: AxiosResponse<ProductType[]>) => {
        return response.data.map((productType: ProductType) => {
          return ProductType.clone<ProductType>(productType);
        });
      });
  };

  public count = (productSearch: ProductSearch): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), productSearch)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public delete = (product: Product): Promise<Product> => {
    return this.http.post<Product>(kebabCase(nameof(this.delete)), product)
      .then((response: AxiosResponse<Product>) => {
        return Product.clone<Product>(response.data);
      });
  };

  public get = (product: Product): Promise<Product> => {
    return this.http.post<Product>(kebabCase(nameof(this.get)), product)
      .then((response: AxiosResponse<Product>) => {
        return Product.clone<Product>(response.data);
      });
  };

  public singleListProductStatus = (): Promise<ProductStatus[]> => {
    return this.http.post<ProductStatus[]>(kebabCase(nameof(this.singleListProductStatus)), new ProductStatusSearch())
      .then((response: AxiosResponse<ProductStatus[]>) => {
        return response.data.map((productType: ProductStatus) => {
          return ProductStatus.clone<ProductStatus>(productType);
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

  public singleListMerchant = (merchantSearch: MerchantSearch): Promise<Merchant[]> => {
    return this.http.post<Merchant[]>(kebabCase(nameof(this.singleListMerchant)), merchantSearch)
      .then((response: AxiosResponse<Merchant[]>) => {
        return response.data.map((merchant: Merchant) => {
          return Merchant.clone<Merchant>(merchant);
        });
      });
  };

  public update = (product: Product): Promise<Product> => {
    return this.http.post<Product>(kebabCase(nameof(this.update)), product)
      .then((response: AxiosResponse<Product>) => {
        return Product.clone<Product>(response.data);
      });
  };

  public create = (product: Product): Promise<Product> => {
    return this.http.post<Product>(kebabCase(nameof(this.create)), product)
      .then((response: AxiosResponse<Product>) => {
        return Product.clone<Product>(response.data);
      });
  };

  public save = (product: Product): Promise<Product> => {
    if (product.id) {
      return this.update(product);
    }
    return this.create(product);
  };
}

export default new ProductDetailRepository();
