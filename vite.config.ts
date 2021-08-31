import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',

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
      allow: ['.'],
    },
  },
});
