import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      types: path.resolve(__dirname, "./src/types"),
      site: path.resolve(__dirname, "./src/site.ts"),
      helpers: path.resolve(__dirname, "./src/helpers.tsx"),
      src: path.resolve(__dirname, "./src"),
    },
  },
});
