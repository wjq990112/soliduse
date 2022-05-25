/// <reference types="vitest/globals" />
import { createEffect, createSignal } from 'solid-js';
import { cleanup, fireEvent, mount } from '../test';

describe('@soliduse/shared/test', () => {
  afterEach(() => {
    cleanup();
  });

  // TODO: test case for hydration
  test('should call createEffect without hydration correctly', () => {
    const firstEffect = vi.fn();
    const secondEffect = vi.fn();

    let ref: HTMLElement;
    function App() {
      const [count, setCount] = createSignal(0);
      createEffect(firstEffect);
      createEffect(() => {
        count();
        secondEffect();
      });
      return (
        <div ref={ref} data-testid="app" onClick={() => setCount(count() + 1)}>
          {count()}
        </div>
      );
    }

    const { queryByTestId } = mount(App);
    expect(firstEffect).toHaveBeenCalledTimes(1);
    expect(secondEffect).toHaveBeenCalledTimes(1);
    const el = queryByTestId('app');
    expect(ref).toEqual(el);
    fireEvent.click(el);
    expect(secondEffect).toHaveBeenCalledTimes(2);
    expect(el.textContent).toEqual('1');
  });
});
