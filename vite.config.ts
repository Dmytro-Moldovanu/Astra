import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use the GitHub Pages project path only for the published build.
  // Local development and Codespaces continue to open at the root URL.
  base: process.env.ASTRA_PAGES === '1' ? '/Astra/' : './',
})
