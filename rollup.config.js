/**
 * @desc   rollup配置 rollup.config.js
 * @author yijie
 * @date   2021-03-30 07:35
 * @notes  2021-03-30 07:35 yijie 创建了 rollup.config.js 文件
 */
import * as path from 'path'
import merge from 'lodash.merge'

import { uglify } from 'rollup-plugin-uglify'

import json from 'rollup-plugin-json'
import { eslint } from 'rollup-plugin-eslint'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'

import pkg from './package.json'

const extensions = ['.js', '.ts']

const resolve = (...args) => {
  return path.resolve(__dirname, ...args)
}

const jobs = {
  esm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module)
    }
  },
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main)
    }
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1'))
    },
    plugins: [ uglify() ]
  }
}

export default merge({
  input: './src/index.ts',
  output: { name: pkg.name },
  plugins: [
    json(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: [ 'src/**/*.ts' ],
      exclude: [ 'node_modules/**', 'lib/**', '*.js' ],
    }),
    commonjs(),
    nodeResolve({
      extensions,
      modulesOnly: true,
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    typescript({
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {
        compilerOptions : { module: "esnext" }
      }
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      extensions,
    })
  ]
}, jobs[process.env.FORMAT || 'esm'])
