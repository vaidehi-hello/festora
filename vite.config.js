import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site work on Vercel, Netlify and GitHub Pages
export default defineConfig({
  base: './',
  plugins: [react()],
});
