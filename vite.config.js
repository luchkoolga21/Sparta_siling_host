import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Sparta_siling_host/',
  plugins: [react()],
  assetsInclude: ['**/*.MOV'],
  build: {
    outDir: 'docs',
  },
})
