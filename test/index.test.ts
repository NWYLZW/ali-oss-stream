import assert from 'assert'
import { imgHelper } from '@ali-oss-stream'

describe('AliOssStream:', () => {
  describe('helpers', () => {
    test('img helper resize w to 50', () => {
      assert.strictEqual(
        imgHelper(
          'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg'
        ).resize({ w: 50 }).end(),
        'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg?x-oss-process=image/resize,w_50'
      )
    })
  })
})
