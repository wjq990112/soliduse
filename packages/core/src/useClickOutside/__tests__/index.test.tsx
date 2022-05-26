/// <reference types="vitest/globals" />
import type { Fn } from '@soliduse/shared';

import { onMount } from 'solid-js';
import { cleanup, fireEvent, mount } from '@soliduse/shared';
import useClickOutside from '..';

describe('@soliduse/core/useClickOutside', () => {
  afterEach(() => {
    cleanup();
  });

  test('should be triggered when clicking outside of target correctly', () => {
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
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should not be triggered when clicking outside of target which is ignored correctly', () => {
    const listener = vi.fn();

    let ref: HTMLElement;
    let ignoreRef: HTMLElement;
    function App() {
      onMount(() => {
        useClickOutside(ref, listener, { ignore: [ignoreRef] });
      });

      return (
        <div data-testid="app">
          <button ref={ref}>Button</button>
          <span ref={ignoreRef}>Hello World</span>
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

  test('should be triggered when clicking outside of target after unregistering correctly', () => {
    const listener = vi.fn();

    let unregister: Fn;
    let ref: HTMLElement;
    function App() {
      onMount(() => {
        unregister = useClickOutside(ref, listener);
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
    expect(listener).toHaveBeenCalledTimes(1);

    unregister();

    expect(listener).toHaveBeenCalledTimes(1);
    fireEvent.click(queryByText(/button/i));
    expect(listener).toHaveBeenCalledTimes(1);
    fireEvent.click(queryByText(/hello world/i));
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
