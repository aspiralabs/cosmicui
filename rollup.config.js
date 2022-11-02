import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import cleaner from "rollup-plugin-cleaner";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "esm",
        preserveModules: true,
        sourcemap: true,
      },
    ],
    plugins: [
      cleaner({ targets: "dist" }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      babel({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        exclude: /node_modules/,
        presets: [
          ["@babel/preset-env", { targets: "defaults" }],
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist",
        declarationDir: "dist",
      }),
      postcss(),
    ],
  },
];
