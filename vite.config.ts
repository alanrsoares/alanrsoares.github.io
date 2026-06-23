import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      types: path.resolve(__dirname, "./src/types"),
      resume: path.resolve(__dirname, "./src/resume.ts"),
      helpers: path.resolve(__dirname, "./src/helpers.tsx"),
      src: path.resolve(__dirname, "./src"),
    },
  },
});
