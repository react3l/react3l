import {Search} from 'core/models/Search';

export class ItemSearch extends Search {

  public id?: number;

  public productId?: number;

  public firstVariation?: string;

  public secondVariation?: string;

  public sKU?: string;

  public price?: number;

  public minPrice?: number;

  public quantity?: number;

  public disabled?: boolean;

}
