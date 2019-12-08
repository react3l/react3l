import { Model } from './Model';

describe('Model', () => {
  class ChildModel extends Model {
    public name: string;
  }

  it('create model from object', () => {
    const name: string = 'Test Model';
    const childModel: ChildModel = new ChildModel({
      name,
    });
    expect(childModel.name).toEqual(name);
  });
});
