// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://172.20.10.7:8080",
        changeOrigin: true,
        // 만약 서버 쪽이 /api 프리픽스까지 포함해서 받는 구조면 rewrite 필요 없음
        // rewrite: path => path.replace(/^\/api/, "")   // 서버가 /api 없이 받는 경우에만 사용
      },
    },
  },
});
