import {act, renderHook} from '@testing-library/react-hooks';
import {useSubscription} from '@react3l/react3l/hooks';

test('hook:useSubscription', () => {
  const {result, unmount} = renderHook(() => useSubscription());

  act(() => {
    unmount();
  });

  expect(result.current.closed).toEqual(true);
});
