import type { Config } from '@jest/types'
import * as path from "path"

const config: Config.InitialOptions = {
  verbose: true,
  moduleNameMapper: {
    'ali-oss-stream/(.*)': path.join(__dirname, './src/$1'),
    'ali-oss-stream': path.join(__dirname, './src/index')
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [ 'ts', 'js', 'json' ],
};
export default config;
