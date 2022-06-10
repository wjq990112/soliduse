export * from './breakpoints';

import type { ConfigurableWindow } from '@soliduse/shared';

import { computeWithUnit, defalutWindow, isNumber } from '@soliduse/shared';
import useMediaQuery from '../useMediaQuery';

type UseBreakpointsOptions = {} & ConfigurableWindow;
export type Breakpoints<K extends string = string> = Record<K, number | string>;

export default function useBreakpoints<K extends string = string>(
  breakpoints: Breakpoints<K>,
  options?: UseBreakpointsOptions
) {
  const getValue = (key: K, delta?: number) => {
    let value = breakpoints[key];

    if (isNumber(delta)) {
      value = computeWithUnit(value, delta);
    }

    if (isNumber(value)) {
      return `${value}px`;
    }

    return value;
  };

  const { window = defalutWindow } = options ?? {};

  const match = (query: string) => {
    if (!window) {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const greater = (key: K) => {
    const matches = useMediaQuery(`(min-width: ${getValue(key)})`, options);
    return matches();
  };

  const smaller = (key: K) => {
    const matches = useMediaQuery(
      `(max-width: ${getValue(key, -0.1)})`,
      options
    );
    return matches();
  };

  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, key) => {
    Object.defineProperty(shortcuts, key, {
      get() {
        return greater(key as K);
      },
      enumerable: true,
      configurable: true,
    });
    return shortcuts;
  }, {} as Record<K, boolean>);

  return {
    greater,
    smaller,
    isGreater(key: K) {
      return match(`(min-width: ${getValue(key)})`);
    },
    isSmaller(key: K) {
      return match(`(max-width: ${getValue(key, -0.1)})`);
    },
    isBetween(a: K, b: K) {
      return match(
        `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`
      );
    },
    ...shortcutMethods,
  };
}
