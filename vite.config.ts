import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages uses /Astra/; Codespaces and local development stay at /.
  base: command === 'build' ? '/Astra/' : './',
}))
