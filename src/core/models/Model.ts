export class Model {

  [key: string]: any;

  public errors?: { [key in keyof Model]: string };

  constructor(model?: { [key in keyof Model]: Model[key] }) {
    if (model) {
      Object.assign<Model, Model>(this, model);
    }
  }
}
