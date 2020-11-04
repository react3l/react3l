import {debounce} from '@react3l/react3l/helpers/lodash';
import {DEBOUNCE_TIME_100} from '@react3l/react3l/config/consts';
import {act} from 'react-dom/test-utils';

test('debounce works', async () => {
  let x: number = 1;

  function increaseX() {
    x += 1;
  }

  const debouncedX = debounce(increaseX, DEBOUNCE_TIME_100);

  for (let i = 0; i < 10; i++) {
    debouncedX();
  }
  expect(x).toEqual(1);
  await act( async() => {
     await new Promise<void>((resolve) => {
       setTimeout(() => {
         resolve();
       }, DEBOUNCE_TIME_100);
     });
  });
  expect(x).toEqual(2);
});
