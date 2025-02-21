import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Force Vite to listen on IPv4 0.0.0.0
    port: 5173,      // (Optional, but good to explicitly set port too)
  },
})