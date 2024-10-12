import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    outDir: 'dist', // Указываем директорию для выходных файлов
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Указываем путь к index.html
    },
  },
})




