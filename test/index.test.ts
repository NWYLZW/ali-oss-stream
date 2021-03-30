/**
 * @desc   index.test.ts
 * @author yijie
 * @date   2021-03-30 14:54
 * @notes  2021-03-30 14:54 yijie 创建了 index.test.ts 文件
 */
import assert from 'assert'
import index from '../src'

describe('validate:', () => {
  describe('rollup', () => {
    test(' return hello rollup ', () => {
      assert.strictEqual(index('rollup'), 'hello rollup')
    })
  })
})
