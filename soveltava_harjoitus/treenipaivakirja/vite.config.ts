import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/soveltava_harjoitus/',
  server: {
    port: 3011
  }
})
