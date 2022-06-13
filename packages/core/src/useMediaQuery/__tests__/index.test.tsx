import { AnyFn, cleanup } from '@soliduse/shared';

import EventEmitter from 'events';
import { createEffect } from 'solid-js';
import { mount } from '@soliduse/shared';
import useMediaQuery from '..';

const mockMatchMedia = vi.fn(window.matchMedia);
vi.spyOn(window, 'matchMedia').mockImplementation(mockMatchMedia);

describe('@soliduse/core/useMediaQuery', () => {
  afterEach(() => {
    cleanup();
  });

  test('should return true correctly when media query matches', () => {
    const eventEmitter = new EventEmitter();
    const addEventListener = vi.fn((evt: string, cb: AnyFn) => {
      eventEmitter.addListener(evt, cb);
    });
    const removeEventListener = vi.fn((evt: string, cb: AnyFn) => {
      eventEmitter.removeListener(evt, cb);
    });
    const dispatchEvent = (evt: Event) => {
      eventEmitter.emit(evt.type);
      mockReturnedValue.matches = false;
    };
    const mockReturnedValue: any = {
      matches: true,
      addEventListener,
      removeEventListener,
      dispatchEvent,
    };
    mockMatchMedia.mockReturnValue(mockReturnedValue);

    let matches!: ReturnType<typeof useMediaQuery>;
    function App() {
      createEffect(() => {
        matches = useMediaQuery('(min-width: 500px)');
      });
      return null;
    }

    const { unmount } = mount(App);
    expect(matches()).toBeTruthy();
    mockReturnedValue.matches = false;
    mockMatchMedia.mockReturnValue(mockReturnedValue);
    dispatchEvent(new Event('change'));
    expect(matches()).toBeFalsy();
    unmount();
  });

  test('should add and remove listener correctly when mount and unmount', () => {
    const addListener = vi.fn();
    const removeListener = vi.fn();
    const mockReturnedValue: any = {
      matches: true,
      addListener,
      removeListener,
    };
    mockMatchMedia.mockReturnValue(mockReturnedValue);

    function App() {
      createEffect(() => {
        useMediaQuery('(min-width: 500px)');
      });
      return null;
    }

    const { unmount } = mount(App);
    expect(addListener).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledTimes(0);
    unmount();
    expect(addListener).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledTimes(1);
  });

  test('should return false correctly when the matchMedia method does not exist', () => {
    // @ts-ignore
    delete window.matchMedia;

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
