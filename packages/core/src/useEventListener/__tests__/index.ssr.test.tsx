import { cleanup, fireEvent, mount } from '@soliduse/shared';
import useEventListener from '..';

const isString = (value: unknown): value is string => typeof value === 'string';
vi.mock('@soliduse/shared/utils/is', () => {
  return {
    get isClient() {
      return false;
    },
    get isString() {
      return isString;
    },
  };
});

describe('@soliduse/core/useEventListener', () => {
  afterEach(() => {
    cleanup();
  });

  test('should register event listener to Window by default correctly when server-side rendering', () => {
    const listener = vi.fn();

    function App() {
      useEventListener('click', listener);
      return null;
    }

    mount(App);
    fireEvent.click(window);
    expect(listener).toHaveBeenCalledTimes(0);
  });
});
