import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/__tests__/**',
        'src/**/*.types.ts',
        'src/types.ts',
        'src/declarations.d.ts',
        'src/test-setup.ts',
        'src/utils/lodash.ts',
        'src/components/index.ts',
        'src/layouts/index.ts',
        'src/utils/index.ts',
      ],
      thresholds: {
        lines: 85,
        branches: 85,
        functions: 85,
        statements: 85,
      },
    },
  },
});
