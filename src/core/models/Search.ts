export const DEFAULT_TAKE: number = 10;

export type SearchOrderType = 'asc' | 'desc';

export class Search {

  [key: string]: any;

  public static setOrderType(orderType: string | null | undefined, instance: Search) {
    if (orderType) {
      if (orderType.toLowerCase().startsWith('asc')) {
        instance.orderType = 'asc';
        return;
      }
    }
    instance.orderType = 'desc';
  }

  public skip?: number = 0;

  public take?: number = DEFAULT_TAKE;

  public orderBy?: string;

  public orderType: SearchOrderType = 'desc';

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(search?: { [key in keyof Search]: Search[key] }) {
    if (!!search) {
      Object.assign(this, search);
    }
  }
}
