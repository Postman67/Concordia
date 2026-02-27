import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const federationTarget = env.FEDERATION_BASE_URL || 'http://localhost:3000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: federationTarget,
          changeOrigin: true,
        },
        '/health': {
          target: federationTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
