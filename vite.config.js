import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    open:true,
    port:5173,
  },
  plugins:[react()],
})

//браузер ашылу үшін
//npm run dev--to open site write in terminal
