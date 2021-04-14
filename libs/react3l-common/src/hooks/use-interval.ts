import React from 'react';

export function useInterval(fn: () => void | Promise<void>, time: number): void {
  React.useEffect(() => {
    const timeout = setInterval(fn, time);

    return function cleanup(): void {
      clearInterval(timeout);
    };
  }, []);
}
