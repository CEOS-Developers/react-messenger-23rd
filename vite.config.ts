import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    watch: {
      usePolling: true, // 파일 변화를 더 공격적으로 감시합니다
    },
  },

  plugins: [react(), tailwindcss()],
});
