# Get Started

## Installation

You can use the package manager which you like, such as `npm`, `yarn` or `pnpm`:

```bash
$ npm install @soliduse/core --save
# or
$ yarn add @soliduse/core --save
# or
$ pnpm install @soliduse/core --save
```

## Usage

After installation, you can use the functions you want in your SolidJS components.

For example, if you want to listen to the click event outside an element, you can use the `useClickOutside` function:

```tsx
// App.tsx
let ref: HTMLElement;
function App() {
  onMount(() => {
    useClickOutside(ref, () => {
      console.log('click outside the button');
    });
  });

  return (
    <div data-testid="app">
      <button ref={ref}>Button</button>
      <span>Hello World</span>
    </div>
  );
}
```

Using the `useClickOutside` function will register a click event listener on `window`, which will check the target of the click event internally. If the target of the click event is `ref`, the callback will not be fired, otherwise, it will be fired.

<iframe src="https://stackblitz.com/edit/useclickoutside?embed=1&file=src/App.tsx&hideExplorer=1&hideNavigation=1" width="100%" height="400rem" style="border: none; border-radius: 8px;" />

:::tip
If the preview window shows that the browser is incompatible, please click the button on the left bottom side to preview in [StackBlitz](https://stackblitz.com/) using a Chromium-based browser.
:::
