import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// ✅ تعریف __dirname برای جلوگیری از ارور ReferenceError در محیط ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    // 👈 برای Render حتماً باید ریشه ('/') باشد
    base: '/',

    plugins: [vue(), tailwindcss()],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});