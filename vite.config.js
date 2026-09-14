import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-games',
      writeBundle() {
        const games = ['count-the-stars', 'rock-paper-scissors'];
        for (const game of games) {
          if (existsSync(game)) {
            cpSync(game, `dist/${game}`, { recursive: true });
          }
        }
      },
    },
  ],
  base: '/tech-for-kids/',
});
