import {Model} from '../Model';

class TestModel extends Model {
  public name?: string;
}

describe('Model', () => {

  it('create model from object', () => {
    const name: string = 'Test Model';
    const childModel: TestModel = TestModel.clone<TestModel>({
      name,
    });
    expect(childModel.name).toEqual(name);
  });
});
