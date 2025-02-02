import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'  // Use node:path instead of path
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
    plugins: [react(),
        tailwindcss()
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                content: resolve(__dirname, 'src/content/content.ts'),
            },
            output: {
                entryFileNames: '[name].js',
            },
        },
    },
})