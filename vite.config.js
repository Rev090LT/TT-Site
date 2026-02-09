import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // если хочешь, чтобы index.html был в src
  build: {
    outDir: '../dist', // если хочешь собирать в папку выше
  }
});