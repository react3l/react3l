import {renderMasterIndex} from '../view';

describe('ant table helpers', () => {
  it('render master index works', () => {
    expect(renderMasterIndex({})(1, {}, 1)).toEqual(2);
  });
});
