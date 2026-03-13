import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // если хочешь, чтобы index.html был в src
  assetsInclude: ['**/*.html'],
  build: {
    outDir: '../dist', // если хочешь собирать в папку выше
  }
});