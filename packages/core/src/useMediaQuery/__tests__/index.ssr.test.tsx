import { createEffect } from 'solid-js';
import { cleanup, mount } from '@soliduse/shared';
import useMediaQuery from '..';

vi.mock('@soliduse/shared/dist/utils/is', () => {
  return {
    get isClient() {
      return false;
    },
  };
});

describe('@soliduse/core/useMediaQuery', () => {
  afterEach(() => {
    cleanup();
  });

  test('should return false correctly when server-side rendering', () => {
    let matches!: ReturnType<typeof useMediaQuery>;
    function App() {
      createEffect(() => {
        matches = useMediaQuery('(min-width: 500px)');
      });
      return null;
    }

    mount(App);
    expect(matches()).toBeFalsy();
  });
});
