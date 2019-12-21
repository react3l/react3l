import rollupTypescript from "@rollup/plugin-typescript";

export default {
  input: "./src/public.ts",
  output: {
    format: "cjs",
    file: "./dist/index.js",
  },
  external: [],
  plugins: [
    rollupTypescript(),
  ],
};
