import type { Fn } from '@soliduse/shared';

import { onMount } from 'solid-js';
import { cleanup, fireEvent, mount } from '@soliduse/shared';
import useClickOutside from '..';

describe('@soliduse/core/useClickOutside', () => {
  afterEach(() => {
    cleanup();
  });

  test('should be triggered correctly when clicking outside of target', () => {
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
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should not be triggered correctly when clicking outside of target which is ignored', () => {
    const listener = vi.fn();

    let ref: HTMLButtonElement;
    let ignoreRef: HTMLSpanElement;
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
    fireEvent.click(queryByText(/button/i) as HTMLButtonElement);
    expect(listener).toHaveBeenCalledTimes(0);
    fireEvent.click(queryByText(/hello world/i) as HTMLSpanElement);
    expect(listener).toHaveBeenCalledTimes(0);
  });

  test('should not be triggered correctly when clicking outside of target after unregistering', () => {
    const listener = vi.fn();

    let unregister!: Fn;
    let ref: HTMLButtonElement;
    let ignoreRef: HTMLDivElement;
    function App() {
      onMount(() => {
        unregister = useClickOutside(ref, listener, {
          ignore: [ignoreRef],
        }) as Fn;
      });

      return (
        <>
          <div ref={ignoreRef} />
          <div data-testid="app">
            <button ref={ref}>Button</button>
            <span>Hello World</span>
          </div>
        </>
      );
    }

    const { queryByTestId, queryByText } = mount(App);
    const el = queryByTestId('app');
    expect(el).toBeInTheDocument();
    expect(listener).toHaveBeenCalledTimes(0);
    fireEvent.click(queryByText(/button/i) as HTMLButtonElement);
    expect(listener).toHaveBeenCalledTimes(0);
    fireEvent.click(queryByText(/hello world/i) as HTMLSpanElement);
    expect(listener).toHaveBeenCalledTimes(1);
    fireEvent.pointerDown(window);
    fireEvent.pointerUp(window);

    unregister();

    expect(listener).toHaveBeenCalledTimes(1);
    fireEvent.click(queryByText(/button/i) as HTMLButtonElement);
    expect(listener).toHaveBeenCalledTimes(1);
    fireEvent.click(queryByText(/hello world/i) as HTMLSpanElement);
    expect(listener).toHaveBeenCalledTimes(1);
    fireEvent.pointerDown(queryByText(/button/i) as HTMLButtonElement);
    fireEvent.pointerDown(queryByText(/hello world/i) as HTMLSpanElement);
    expect(listener).toHaveBeenCalledTimes(1);
    fireEvent.pointerUp(queryByText(/button/i) as HTMLButtonElement);
    fireEvent.pointerUp(queryByText(/hello world/i) as HTMLSpanElement);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
