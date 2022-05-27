import type { AnyFn, ConfigurableWindow } from '@soliduse/shared';

import { createSignal } from 'solid-js';
import { defalutWindow } from '@soliduse/shared';
import useEventListener from '../useEventListener';

type UseClickOutsideOptions = {
  ignore?: EventTarget[];
  capture?: boolean;
} & ConfigurableWindow;

export default function useClickOutside(
  target: EventTarget,
  handler: (event: PointerEvent) => void,
  options?: UseClickOutsideOptions
) {
  const { window = defalutWindow, ignore, capture = true } = options ?? {};

  if (!window) {
    return;
  }

  let fallback: number;
  const [shouldListen, setShouldListen] = createSignal(true);

  const handleClick: AnyFn = (event: PointerEvent) => {
    window.clearTimeout(fallback);

    const composedPath = event.composedPath();

    if (
      !target ||
      target === event.target ||
      composedPath.includes(target) ||
      !shouldListen()
    ) {
      return;
    }

    if (ignore && ignore.length > 0) {
      if (
        ignore.some((target) => {
          return (
            target && (event.target === target || composedPath.includes(target))
          );
        })
      ) {
        return;
      }
    }

    handler(event);
  };

  const handlePointerDown: AnyFn = (event: PointerEvent) => {
    setShouldListen(target && !event.composedPath().includes(target));
  };

  const handlePointerUp: AnyFn = (event: PointerEvent) => {
    fallback = window.setTimeout(() => handleClick(event), 100);
  };

  const cleanup = [
    useEventListener(window, 'click', handleClick, {
      capture,
      passive: true,
    }),
    useEventListener(window, 'pointerdown', handlePointerDown, {
      passive: true,
    }),
    useEventListener(window, 'pointerup', handlePointerUp, {
      passive: true,
    }),
  ];

  const unregister = () => cleanup.forEach((fn) => fn());

  return unregister;
}
