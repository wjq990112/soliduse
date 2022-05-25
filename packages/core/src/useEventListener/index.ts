import type { Fn } from '@soliduse/shared';

import { defalutWindow, isString, noop } from '@soliduse/shared';

type GeneralEventTarget<Events> = {
  addEventListener: (
    eventName: Events,
    listener?: Fn,
    options?: boolean | AddEventListenerOptions
  ) => unknown;
  removeEventListener: (
    eventName: Events,
    listener?: Fn,
    options?: boolean | EventListenerOptions
  ) => unknown;
};

type GeneralEventListenr<CustomEvent extends Event = Event> = (
  event: CustomEvent
) => unknown;

export default function useEventListener<
  EventName extends keyof WindowEventMap
>(
  eventName: EventName,
  listener: (this: Window, event?: WindowEventMap[EventName]) => unknown,
  options?: boolean | AddEventListenerOptions
): Fn;

export default function useEventListener<
  EventName extends keyof WindowEventMap
>(
  target: Window,
  eventName: EventName,
  listener: (this: Window, event?: WindowEventMap[EventName]) => unknown,
  options?: boolean | AddEventListenerOptions
): Fn;

export default function useEventListener<
  EventName extends keyof DocumentEventMap
>(
  target: Document,
  eventName: EventName,
  listener: (this: Window, event?: DocumentEventMap[EventName]) => unknown,
  options?: boolean | AddEventListenerOptions
): Fn;

export default function useEventListener<
  EventNames extends string = string,
  CustomEvent extends Event = Event
>(
  target: GeneralEventTarget<EventNames>,
  eventName: EventNames,
  listener: GeneralEventListenr<CustomEvent>,
  options?: boolean | AddEventListenerOptions
): Fn;

export default function useEventListener(...args: unknown[]) {
  let target: EventTarget;
  let eventName: string;
  let listener: GeneralEventListenr;
  let options: boolean | AddEventListenerOptions | EventListenerOptions;

  if (isString(args[0])) {
    [eventName, listener, options] = args as [
      string,
      GeneralEventListenr,
      boolean | AddEventListenerOptions | EventListenerOptions
    ];
    target = defalutWindow as EventTarget;
  } else {
    [target, eventName, listener, options] = args as [
      EventTarget,
      string,
      GeneralEventListenr,
      boolean | AddEventListenerOptions | EventListenerOptions
    ];
  }

  if (!target) {
    return noop;
  }

  const register = () => {
    target.addEventListener(eventName, listener, options);
  };

  register();

  const unregister = () => {
    target.removeEventListener(eventName, listener, options);
  };

  return unregister;
}