# Ali OSS Stream

<p align="center">
  <a href="https://github.com/NWYLZW/ali-oss-stream/actions/workflows/npm-publish.yml">
    <img src="https://github.com/NWYLZW/ali-oss-stream/workflows/publish%20to%20npm/badge.svg?sanitize=true" alt="Build Status">
  </a>
  <a href="https://npmcharts.com/compare/ali-oss-stream?minimal=true">
    <img src="https://img.shields.io/npm/dm/ali-oss-stream.svg?sanitize=true" alt="Downloads">
  </a>
  <br>
  <a href="https://www.npmjs.com/package/ali-oss-stream">
    <img src="https://img.shields.io/npm/v/ali-oss-stream.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/ali-oss-stream">
    <img src="https://img.shields.io/npm/l/ali-oss-stream.svg?sanitize=true" alt="License">
  </a>
</p>

对阿里对象存储服务的访问url进行流式操作

# 快速使用

* cdn

* 使用 npm `npm i --save ali-oss-stream`
* 使用 yarn `yarn add ali-oss-stream`

# 示例

* 调整图片大小为`50px`

```javascript
import { imgHelper } from '@ali-oss-stream'

const url = imgHelper(
  'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg'
).resize({ w: 50 }).end()
console.log(url)
// https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg?x-oss-process=image/resize,w_50
```
