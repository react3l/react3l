import {debounce} from '../debounce';

describe('debounce helpers', () => {
  it('debounce works', () => {
    let x: number = 1;
    const updateX = debounce(() => {
      x = x + 1;
    });
    for (let i = 0; i < 10; i++) {
      updateX();
    }
    setTimeout(() => {
      expect(x).toEqual(2);
    }, 400);
  });
});
