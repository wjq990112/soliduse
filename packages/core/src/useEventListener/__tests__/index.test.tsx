import type { Fn } from '@soliduse/shared';

import { onMount } from 'solid-js';
import { cleanup, fireEvent, mount } from '@soliduse/shared';
import useEventListener from '..';

describe('@soliduse/core/useEventListener', () => {
  afterEach(() => {
    cleanup();
  });

  test('should register event listener to Window by default correctly', () => {
    const listener = vi.fn();

    function App() {
      useEventListener('click', listener);
      return null;
    }

    mount(App);
    fireEvent.click(window);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should register event listener to Window correctly', () => {
    const listener = vi.fn();

    function App() {
      useEventListener(window, 'click', listener);
      return null;
    }

    mount(App);
    fireEvent.click(window);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should register event listener to Document correctly', () => {
    const listener = vi.fn();

    function App() {
      useEventListener(document, 'click', listener);
      return null;
    }

    mount(App);
    fireEvent.click(document);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should register event listener to HTMLElement correctly', () => {
    const listener = vi.fn();

    let ref!: HTMLDivElement;
    function App() {
      onMount(() => {
        useEventListener(ref, 'click', listener);
      });
      return <div ref={ref} data-testid="app" />;
    }

    const { queryByTestId } = mount(App);
    const el = queryByTestId('app');
    expect(el).toBeInTheDocument();
    expect(el).toEqual(ref);
    fireEvent.click(el as HTMLDivElement);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should not register event listener when the target is not exist correctly', () => {
    let noop!: Fn;
    function App() {
      noop = useEventListener(null, 'click', () => {});
      return null;
    }

    mount(App);
    expect(Function.prototype.toString.call(noop)).toMatchInlineSnapshot(
      '"() => { }"'
    );
  });

  test('should unregister event listener correctly', () => {
    const listener = vi.fn();

    let unregister!: Fn;
    function App() {
      unregister = useEventListener('click', listener);
      return null;
    }

    mount(App);
    fireEvent.click(window);
    expect(listener).toHaveBeenCalledTimes(1);
    unregister();
    fireEvent.click(window);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
