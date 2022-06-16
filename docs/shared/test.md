# Test Utils

## Description

Like `@testing-library/react`, we have provided a test library for testing the SolidJS application.

## Installation

You can use the package manager which you like, such as `npm`, `yarn` or `pnpm`:

```bash
npm install @soliduse/shared --save-dev
# or
yarn add @soliduse/shared --save-dev
# or
pnpm install @soliduse/shared --save-dev
```

## Usage

After installation, you can use the functions you want to test your SolidJS components.

For example, if you want to test a click event fired or not, you can use the `mount` to render your SolidJS components, and use the `fireEvent` object to fire the click event:

```tsx
// App.tsx
import type { Component } from 'solid-js';

interface Props {
  onClick: () => void;
}

const App: Component<Props> = ({ onClick }) => {
  return <button onClick={onClick}>click me</button>;
};

export default App;
```

```tsx
// App.test.tsx
import { fireEvent, mount } from '@soliduse/shared';

import App from './App';

it('should be fired', () => {
  const onClick = vi.fn();

  const { queryByText } = mount(() => <App onClick={onClick} />);
  expect(onClick).not.toHaveBeenCalled();
  const button = queryByText(/click me/i) as HTMLButtonElement;
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});
```

Using the `mount` function will create a `div` element as a root for rendering the `App` component, it will return some query functions to help you get the element you want to test.

Using the `fireEvent` object to fire the event you want, and check if the event listener fires.

<iframe src="https://stackblitz.com/edit/test-click-event?embed=1&file=src/App.test.tsx&hideExplorer=1&hideNavigation=1" width="100%" height="400rem" style="border: none; border-radius: 8px;" />

:::tip
If the preview window shows that the browser is incompatible, please click the button on the left bottom side to preview in [StackBlitz](https://stackblitz.com/) using a Chromium-based browser.
:::
