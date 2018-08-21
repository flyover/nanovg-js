import commonjs from 'rollup-plugin-commonjs';
import builtins from "rollup-plugin-node-builtins";
import typescript from "rollup-plugin-typescript2";

const plugins = [
  typescript({
    clean: true,
    tsconfigOverride: {
      compilerOptions: {
        target: "ES2015",
        module: "ES2015"
      }
    }
  }),
  commonjs({
    namedExports: {
      "bind-nanovg.js": [ "bind" ]
    }
  }),
  builtins(),
];

export default [
  {
    input: "nanovg.ts",
    output: {
      file: "dist/nanovg.umd.js",
      name: "NVG",
      format: "umd",
      exports: "named"
    },
    plugins: plugins
  }
];
