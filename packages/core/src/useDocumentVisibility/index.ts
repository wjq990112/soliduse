import { createSignal } from 'solid-js';
import { isClient } from '@soliduse/shared';
import useEventListener from '../useEventListener';

type VisibilityState = 'hidden' | 'prerender' | 'visible';

const getVisibility = () => {
  if (!isClient) {
    return 'visible';
  }

  return document.visibilityState;
};

export default function useDocumentVisibility(): VisibilityState {
  const [documentVisibility, setDocumentVisibility] = createSignal(
    getVisibility()
  );

  const handleVisibilityChange = () => {
    setDocumentVisibility(getVisibility());
  };

  useEventListener(document, 'visibilitychange', handleVisibilityChange);

  return documentVisibility();
}
