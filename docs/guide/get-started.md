# Get Started

## Installation

You can use the package manager which you like, such as `npm`, `yarn` or `pnpm`:

```bash
$ npm install @soliduse/core@next
# or
$ yarn add @soliduse/core@next
# or
$ pnpm install @soliduse/core@next
```

## Usage

After installation, you can use the functions you want in your Solid components.

For example, if you want to listen to the click event outside an element, you can use the `useClickOutside` function:

```tsx
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

Using the `useClickOutside` function will register a click event listener on `window`, which will judge the target of the click event internally. If the target of the click event is `ref`, the callback will not be triggered, otherwise, it will be triggered.

<iframe src="https://stackblitz.com/edit/useclickoutside?embed=1&file=src/App.tsx&hideExplorer=1&hideNavigation=1" width="100%" height="400rem" style="border: none; border-radius: 8px;" />

:::tip
Please click the button on the left bottom side to preview in `StackBlitz`.
:::
