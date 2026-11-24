import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages project site: https://a-skripkin.github.io/anton-tech/
  base: command === 'build' ? '/anton-tech/' : '/',
}))
