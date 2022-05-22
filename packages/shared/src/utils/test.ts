export * from '@testing-library/dom';

import type { JSX } from 'solid-js';
import type { PrettyDOMOptions } from '@testing-library/dom';
import type { Container } from './types';

import { hydrate, render } from 'solid-js/web';
import { getQueriesForElement, prettyDOM, queries } from '@testing-library/dom';

type Root = ReturnType<typeof createRoot>;

type RootEntry = {
  container: Container;
  root: Root;
};

type Options = {
  baseElement?: HTMLElement;
  container?: HTMLElement;
  hydrate?: boolean;
  queries?: typeof queries;
};

const mountedContainers = new Set<Container>();
const mountedRootEntries: RootEntry[] = [];

function createRoot(container: HTMLElement) {
  let dispose: () => void;

  return {
    hydrate(element: () => JSX.Element) {
      dispose = hydrate(element, container);
    },
    render(element: () => JSX.Element) {
      dispose = render(element, container);
    },
    unmount() {
      return dispose();
    },
  };
}

export function mount(ui: () => JSX.Element, options: Options = {}) {
  let { baseElement, container, hydrate: isHydrate, queries } = options;

  baseElement = container;

  if (!baseElement) {
    baseElement = document.body;
  }

  if (!container) {
    container = baseElement.appendChild(document.createElement('div'));
  }

  let root = createRoot(container);
  if (!mountedContainers.has(container)) {
    mountedContainers.add(container);
    mountedRootEntries.push({ container, root });
  } else {
    mountedRootEntries.forEach((rootEntry) => {
      if (rootEntry.container === container) {
        root = rootEntry.root;
      }
    });
  }

  if (isHydrate) {
    root.hydrate(ui);
  } else {
    root.render(ui);
  }

  const debug = (
    el: HTMLElement | HTMLElement[] = baseElement as HTMLElement,
    maxLength: number,
    options: PrettyDOMOptions
  ) => {
    if (Array.isArray(el)) {
      el.forEach((element) => {
        console.log(prettyDOM(element, maxLength, options));
      });
      return;
    }

    console.log(prettyDOM(el, maxLength, options));
  };

  const unmount = () => {
    root.unmount();
  };

  return {
    baseElement,
    container,
    debug,
    unmount,
    ...getQueriesForElement(baseElement, queries),
  };
}

export function cleanup() {
  mountedRootEntries.forEach(({ root, container }) => {
    root.unmount();

    if (
      [container.parentElement, container.parentNode].includes(document.body)
    ) {
      document.body.removeChild(container);
    }
  });

  mountedContainers.clear();
  mountedRootEntries.length = 0;
}
