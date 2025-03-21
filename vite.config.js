import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'job-application-form' with your repository name
export default defineConfig({
  plugins: [react()],
  base: '/job-application-form/',
});
