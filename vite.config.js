import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/Drag.js'),
            name: 'Drag',
            fileName: (format) => `Drag.${format}.js`,
            formats: ['es', 'umd'],
        },
        outDir: 'dist',
    }
})
