import resolve from "@rollup/plugin-node-resolve";

import commonjs from "@rollup/plugin-commonjs";

import terser from "@rollup/plugin-terser";

export default {
  external: ["jsdom"],
  input: "./src/index.js",
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
