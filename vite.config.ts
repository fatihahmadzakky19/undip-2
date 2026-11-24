import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/')
          if (normalized.includes('/node_modules/three/')) {
            return 'three-core'
          }
          if (normalized.includes('/node_modules/@react-three/')) {
            return 'r3f-drei'
          }
          if (
            normalized.includes('/node_modules/react/') ||
            normalized.includes('/node_modules/react-dom/')
          ) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
