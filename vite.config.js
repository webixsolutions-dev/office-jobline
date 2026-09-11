import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Tailwind is handled by @tailwindcss/vite. Pin an inline PostCSS
  // config so Vite does not walk up to D:\postcss.config.mjs.
  css: {
    postcss: {
      plugins: [],
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
})