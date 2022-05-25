import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, 'utils/setupTests.ts')],
    transformMode: {
      web: [/\.(j|t)sx?$/],
    },
    deps: {
      inline: [/solid-js/],
    },
  },
});
