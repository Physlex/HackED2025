import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../src-django/src/static",
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: "src/main.tsx"
    }
  }
})
