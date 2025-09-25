import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuring the proxy to forward API requests to the back-end server
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    }
  }
})