import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/alfa-test-spa/",

  resolve: {
    alias: {
      "@store": "/src/app",
      "@features": "/src/features",
      "@pages": "/src/pages",
      "@components": "/src/components",
    },
  },
});
