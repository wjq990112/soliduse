import stripAnsi from 'strip-ansi';
import { createEffect, createSignal } from 'solid-js';
import { cleanup, fireEvent, mount } from '../test';

const log = vi.fn(stripAnsi);
vi.spyOn(console, 'log').mockImplementation((message: string) => {
  log(stripAnsi(message));
});

describe('@soliduse/shared/test', () => {
  afterEach(() => {
    cleanup();
  });

  // TODO: test case for hydration
  test('should call createEffect without hydration correctly', () => {
    const firstEffect = vi.fn();
    const secondEffect = vi.fn();

    let ref!: HTMLDivElement;
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

    const { debug, queryByTestId, unmount } = mount(App);
    debug();
    expect(log).toHaveBeenCalledWith(`<body>
  <div>
    <div
      data-testid="app"
    >
      0
    </div>
  </div>
</body>`);
    debug([document.body]);
    expect(log).toHaveBeenCalledWith(`<body>
  <div>
    <div
      data-testid="app"
    >
      0
    </div>
  </div>
</body>`);
    expect(firstEffect).toHaveBeenCalledTimes(1);
    expect(secondEffect).toHaveBeenCalledTimes(1);
    const el = queryByTestId('app');
    expect(ref).toEqual(el);
    fireEvent.click(el as HTMLDivElement);
    expect(secondEffect).toHaveBeenCalledTimes(2);
    expect((el as HTMLDivElement).textContent).toEqual('1');
    unmount();
    expect(queryByTestId('app')).not.toBeInTheDocument();
  });
});
