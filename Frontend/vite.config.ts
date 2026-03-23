import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // Tailwind v4 uses a Vite plugin instead of PostCSS
  ],
  server: {
    port: 5173,
    // Proxy API calls to Express backend so no CORS issues in dev
    proxy: {
      '/api': {
        target:      'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})