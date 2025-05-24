import resolve from "@rollup/plugin-node-resolve";

import commonjs from "@rollup/plugin-commonjs";

import terser from "@rollup/plugin-terser";

export default {
  input: "./src/index.js",
  external: ["jsdom"],
  plugins: [resolve(), commonjs()],
  output: [
    {
      file: "./dist/index.min.js",
      format: "umd",
      name: "cenatizer",
      globals: { jsdom: "JSDOM" },
      exports: "named",
      plugins: [terser()],
    }
  ]
};
