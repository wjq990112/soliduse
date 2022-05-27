/// <reference types="vitest/globals" />

import { createEffect } from 'solid-js';
import { cleanup, mount } from '@soliduse/shared';
import useDocumentVisibility from '..';

const mockDocumentVisibilityState = vi.spyOn(
  document,
  'visibilityState',
  'get'
);

describe('@soliduse/core/useDocumentVisibility', () => {
  afterEach(() => {
    cleanup();
  });

  test('should update document.visibilityState when visibility changed', () => {
    mockDocumentVisibilityState.mockReturnValue('hidden');

    let visibilityState: ReturnType<typeof useDocumentVisibility>;
    function App() {
      createEffect(() => {
        visibilityState = useDocumentVisibility();
      });

      return null;
    }

    mount(App);
    expect(visibilityState).toEqual('hidden');
    mockDocumentVisibilityState.mockReturnValue('visible');
    document.dispatchEvent(new Event('visibilitychange'));
    expect(visibilityState).toEqual('visible');
  });
});
