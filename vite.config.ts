import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Markdown from "vite-plugin-md";
import eslint from "@rollup/plugin-eslint";
import strip from "@rollup/plugin-strip";

export default defineConfig({
  // TODO
  //   If we want to be able to drag- drop the index.html into a browser,
  //   and to avoid CORS:
  //   - build with relative paths
  //   - build js into a single chunk
  //   - inline the js chunk into the index.html ( plugin? )
  //
  // base: "./",

  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // force output of a single js chunk
        manualChunks: undefined,
      },
    },
  },

  resolve: {
    // will be passed to @rollup/plugin-alias as its entries option.
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
  },

  plugins: [
    //
    vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Markdown(),

    {
      ...eslint({
        include: "./src/**/*.(vue|js|jsx|ts|tsx)",
      }),
      enforce: "pre",

      // uncomment this to lint only on `vite build`
      apply: "build",
    },

    {
      ...strip({ include: "./src/**/*.(js|ts)" }),
      apply: "build",
    },
  ],

  server: {
    port: 8080,
  },
});
