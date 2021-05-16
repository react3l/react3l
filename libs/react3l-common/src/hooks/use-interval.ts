import React from 'react';

/**
 * Use interval in component
 *
 * @param fn {() => void | Promise<void>} - callback function
 * @param time {number} - timeout
 */
export function useInterval(fn: () => void | Promise<void>, time: number): void {
  React.useEffect(() => {
    const timeout = setInterval(fn, time);

    return function cleanup(): void {
      clearInterval(timeout);
    };
  }, []);
}
