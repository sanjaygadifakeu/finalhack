import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // Optional: Helps debug issues with builds
  },
  server: {
    port: 3000, // Ensure the local server runs on this port
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'), // Ensures environment is set correctly
  },
});
