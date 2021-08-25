import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import { name } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${name}/`,

  resolve: {
    alias: [
      /** Support less import prefix. @see https://github.com/vitejs/vite/issues/2185#issuecomment-784637827 */
      { find: /^~/, replacement: '' },
    ],
  },

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
      strict: false,
      allow: ['.'],
    },
  },
});
