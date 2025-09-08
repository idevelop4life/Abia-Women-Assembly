import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional — just sets dev port
    host: true  // optional — lets you access dev server from network
  }
})