import React from 'react';

export function useTimeout(fn: Function, time: number): void {
  React.useEffect(() => {
    const timeout = setTimeout(fn, time);

    return function cleanup(): void {
      clearTimeout(timeout);
    };
  }, []);
}
