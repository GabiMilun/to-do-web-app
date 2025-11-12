import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Bind dev server to 0.0.0.0 so Docker-hosted container can be reached from the host
  server: {
    host: true,
    port: 5173
  }
})

