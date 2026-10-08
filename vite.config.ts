import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/

const targetApi = 'http://127.0.0.1:3000';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        host: '127.0.0.1',
        proxy: {
            '/api': {
                target: targetApi,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
});
