import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [RubyPlugin()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
