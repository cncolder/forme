import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

import { name } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${name}/`,

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  plugins: [reactRefresh()],

  server: {
    fs: {
      allow: ['.'],
    },
  },
});
