import assert from 'assert'
import { imgHelper } from 'ali-oss-stream'

describe('img helper', () => {
  describe('push options', () => {
    test('resize options', () => {
      const url = 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg'
      assert.strictEqual(
        imgHelper(url)
          .pushAction('resize', { w: 12 })
          .end(), `${url}?__date__=2021-04-11`
      )
    })
  })
  describe('resize', () => {
    test('w 50', () => {
      const url = 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg'
      assert.strictEqual(
        imgHelper(url)
          .resize({ w: 50 })
          .end(), `${url}?x-oss-process=image/resize,w_50`
      )
    })
    test('w 50, h 100', () => {
      const url = 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg'
      assert.strictEqual(
        imgHelper(url)
          .resize({ w: 50, h: 100 })
          .end(), `${url}?x-oss-process=image/resize,w_50,h_100`
      )
      assert.strictEqual(
        imgHelper(url)
          .resize({ w: 50 })
          .resize({ h: 100 })
          .end(), `${url}?x-oss-process=image/resize,w_50/resize,h_100`
      )
    })
  })
  describe('push query', () => {
    test('a query', () => {
      const url = 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg'
      assert.strictEqual(
        imgHelper(url)
          .pushQuery('__date__', '2021-04-11')
          .end(), `${url}?__date__=2021-04-11`
      )
    })
    test('queries', () => {
      const url = 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg'
      assert.strictEqual(
        imgHelper(url)
          .pushQueries({
            __date__: '2021-04-11',
            __none__: '2021-04-11'
          })
          .end(), `${url}?__date__=2021-04-11&__none__=2021-04-11`
      )
    })
    test('w 50, query', () => {
      const url = 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/smile.jpg'
      assert.strictEqual(
        imgHelper(url)
          .resize({ w: 50 })
          .pushQuery('__date__', '2021-04-11')
          .end(), `${url}?x-oss-process=image/resize,w_50&__date__=2021-04-11`
      )
      assert.strictEqual(
        imgHelper(url)
          .pushQuery('__date__', '2021-04-11')
          .resize({ w: 50 })
          .end(), `${url}?x-oss-process=image/resize,w_50&__date__=2021-04-11`
      )
    })
  })
})
