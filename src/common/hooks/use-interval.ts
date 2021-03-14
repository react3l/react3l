import React from 'react';

export function useInterval(fn: Function, time: number): void {
  React.useEffect(() => {
    const timeout = setInterval(fn, time);

    return function cleanup(): void {
      clearInterval(timeout);
    };
  }, []);
}
