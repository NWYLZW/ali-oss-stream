import assert from 'assert'
import { imgHelper } from 'ali-oss-stream'

describe('AliOssStream:', () => {
  describe('helpers', () => {
    test('img helper resize w to 50', () => {
      const url = 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg'
      assert.strictEqual(
        imgHelper(url).resize({ w: 50 }).end(), `${url}?x-oss-process=image/resize,w_50`
      )
    })
  })
})
