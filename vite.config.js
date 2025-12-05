import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/kaaychargé/',  // Ajoutez cette ligne !
  server: {
    port: 5173,
    open: true
  }
})
