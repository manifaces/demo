import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    // система импортов TypeScript (иначе он игнорирует baseUrl)
    tsconfigPaths({ root: './' })
  ],
  // абсолютные импорты в SCSS-файлах
  resolve: { alias: { styles: '/src/styles' } }
});
