import type { Accessor, JSX } from 'solid-js';

export type Awaitable<T> = T | Promise<T>;
export type Component = () => JSX.Element;
export type Container = Element | Document | DocumentFragment;
export type Fn = () => void;
export type MaybeAccessor<T> = T | Accessor<T>;
export type RenderOptions = {
  root?: HTMLElement;
};
