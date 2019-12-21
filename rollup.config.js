import rollupTypescript from "@rollup/plugin-typescript";

export default {
  input: "./src/core/index.ts",
  output: [
    {
      format: "cjs",
      file: "./dist/index.js",
    },
    {
      format: "es",
      file: "./dist/index.es.js",
    },
  ],
  external: [],
  plugins: [
    rollupTypescript({
      tsconfig: "tsconfig.lib.json",
    }),
  ],
};
