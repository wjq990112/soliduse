/// <reference types="vitest/globals" />

import { createEffect } from 'solid-js';
import { cleanup, mount } from '@soliduse/shared';
import useDocumentVisibility from '..';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';
const mockDocumentVisibilityState = vi.spyOn(
  document,
  'visibilityState',
  'get'
);

vi.mock('@soliduse/shared/dist/utils/is', () => ({
  get isClient() {
    return false;
  },
  get isString() {
    return isString;
  },
}));

describe('@soliduse/core/useDocumentVisibility', () => {
  afterEach(() => {
    cleanup();
  });

  test('should get document.visibilityState correctly when ssr', () => {
    mockDocumentVisibilityState.mockReturnValue('hidden');

    let visibilityState: ReturnType<typeof useDocumentVisibility>;
    function App() {
      createEffect(() => {
        visibilityState = useDocumentVisibility();
      });

      return null;
    }

    mount(App);
    expect(visibilityState).toEqual('visible');
  });
});
