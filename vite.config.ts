import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      VitePWA({
        strategies: 'injectManifest',
        manifest: false, // correct manifest in public folder
        injectManifest: {
          globPatterns: ['assets/*', 'favicon.*', 'index.html'], // cache all assets
        },
      })
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
      ],
    },
    server: {
      port: parseInt(env.VITE_PORT)
    },
    css: { 
      preprocessorOptions: { 
        scss: {
          additionalData: `@import "@/assets/variables/styles.scss";`,
        }
      }
    }
  }
});
