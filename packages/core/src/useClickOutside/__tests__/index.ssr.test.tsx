/// <reference types="vitest/globals" />

import { onMount } from 'solid-js';
import { cleanup, fireEvent, mount } from '@soliduse/shared';
import useClickOutside from '..';

vi.mock('@soliduse/shared/dist/utils/is', () => ({
  get isClient() {
    return false;
  },
}));

describe('@soliduse/core/useClickOutside', () => {
  afterEach(() => {
    cleanup();
  });

  test('should not be triggered correctly when server-side rendering', () => {
    const listener = vi.fn();

    let ref: HTMLElement;
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
    fireEvent.click(queryByText(/button/i));
    expect(listener).toHaveBeenCalledTimes(0);
    fireEvent.click(queryByText(/hello world/i));
    expect(listener).toHaveBeenCalledTimes(0);
  });
});