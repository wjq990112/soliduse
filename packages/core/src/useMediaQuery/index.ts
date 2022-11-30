import type { ConfigurableWindow } from '@soliduse/shared';

import { createSignal, onCleanup, onMount } from 'solid-js';
import { defalutWindow } from '@soliduse/shared';

type UseMediaQueryOptions = {} & ConfigurableWindow;

export default function useMediaQuery(
  query: string,
  options?: UseMediaQueryOptions
) {
  const { window = defalutWindow } = options ?? {};
  const isSupported = window && 'matchMedia' in window;

  let mediaQuery: MediaQueryList;
  const [matches, setMatches] = createSignal(false);

  const update = () => {
    if (!isSupported) {
      return;
    }

    if (!mediaQuery) {
      mediaQuery = window.matchMedia(query);
    }

    setMatches(mediaQuery.matches);
  };

  onMount(() => {
    update();

    if (!mediaQuery) {
      return;
    }

    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', update);
    } else if ('addListener' in mediaQuery) {
      (mediaQuery as MediaQueryList).addListener(update);
    }

    onCleanup(() => {
      if ('removeEventListener' in mediaQuery) {
        mediaQuery.removeEventListener('change', update);
      } else if ('removeListener' in mediaQuery) {
        (mediaQuery as MediaQueryList).removeListener(update);
      }
    });
  });

  return matches;
}
