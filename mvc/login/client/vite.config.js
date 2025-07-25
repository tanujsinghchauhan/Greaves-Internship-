import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login": "http://localhost:5000",
      "/register": "http://localhost:5000",
      "/protected": "http://localhost:5000",
    },
  },
});
