import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import {config} from "dotenv";
import * as path from "path";
import ViteYaml from '@modyfi/vite-plugin-yaml';


config();

export default defineConfig({
  plugins: [ViteYaml(), react(), tsconfigPaths()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },

  define: {
    'process.env': process.env,
  },

})