
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// adjust the paths to your cert files
const certPath = path.resolve(__dirname, 'openssl', 'certificate.pem')
const keyPath = path.resolve(__dirname, 'openssl', 'private_key.pem')

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    // optional: specify port
    port: 3000,
  },
})
