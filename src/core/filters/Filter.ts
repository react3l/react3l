export class Filter {

  constructor(filter?: Filter) {
    if (!!filter) {
      Object.assign(this, filter);
    }
  }
}
