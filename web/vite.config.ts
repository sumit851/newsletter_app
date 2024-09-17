import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), "");
  // const apiPath = path.resolve(__dirname, "");
  return {
    plugins: [react()],
    server: {
      port: 3001,
      proxy: {
        "/api": {
          target: `${process.env.VITE_APP_API_URL}/v1`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
