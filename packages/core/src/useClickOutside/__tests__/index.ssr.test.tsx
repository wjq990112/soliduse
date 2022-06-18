import { onMount } from 'solid-js';
import { cleanup, fireEvent, mount } from '@soliduse/shared';
import useClickOutside from '..';

const isString = (value: unknown): value is string => typeof value === 'string';
vi.mock('@soliduse/shared/utils/is', () => ({
  get isClient() {
    return false;
  },
  get isString() {
    return isString;
  },
}));

describe('@soliduse/core/useClickOutside', () => {
  afterEach(() => {
    cleanup();
  });

  test('should not be fired correctly when server-side rendering', () => {
    const listener = vi.fn();

    let ref: HTMLButtonElement;
    function App() {
      onMount(() => {
        useClickOutside(ref, listener);
      });

      return (
        <div data-testid="app">
          <button ref={ref}>Button</button>
          <span>Hello World</span>
        </div>
      );
    }

    const { queryByTestId, queryByText } = mount(App);
    const el = queryByTestId('app');
    expect(el).toBeInTheDocument();
    expect(listener).toHaveBeenCalledTimes(0);
    fireEvent.click(queryByText(/button/i) as HTMLButtonElement);
    expect(listener).toHaveBeenCalledTimes(0);
    fireEvent.click(queryByText(/hello world/i) as HTMLSpanElement);
    expect(listener).toHaveBeenCalledTimes(0);
  });
});
