import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mdx']
  },
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      include: ['src/index.ts', 'src/components/**/*.{ts,tsx}']
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/config/setupTests.ts'],
    coverage: {
      provider: 'v8',
      exclude: [...configDefaults.coverage.exclude!, 'src/**/*.stories.ts']
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'DisasterDrawer',
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
})
