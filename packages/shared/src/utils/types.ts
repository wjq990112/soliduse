import type { Accessor, JSX } from 'solid-js';
import type {
  BoundFunction,
  PrettyDOMOptions,
  Queries,
} from '@testing-library/dom';

import { queries } from '@testing-library/dom';

export type Awaitable<T> = T | Promise<T>;
export type Component = () => JSX.Element;
export type Container =
  | Element
  | Document
  | ShadowRoot
  | DocumentFragment
  | Node;
export type Fn = () => void;
export type ReturnFn = () => Fn;
export type MaybeAccessor<T> = T | Accessor<T>;
export type MountOptions<
  Q extends Queries = typeof queries,
  B extends Container = HTMLElement,
  C extends Container = HTMLElement
> = {
  baseElement?: B;
  container?: C;
  hydrate?: boolean;
  queries?: Q;
};
export type MountResult<
  Q extends Queries = typeof queries,
  B extends Container = HTMLElement,
  C extends Container = HTMLElement
> = {
  baseElement?: B;
  container?: C;
  debug: (
    el: HTMLElement | HTMLElement[],
    maxLength: number,
    options: PrettyDOMOptions
  ) => void;
  unmount: Fn;
} & {
  [P in keyof Q]: BoundFunction<Q[P]>;
};
