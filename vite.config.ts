import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
/// <reference types="vitest" />

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
})
