import Stream from "@ali-oss-stream/core/stream"
import Action from "@ali-oss-stream/core/action"

// [阿里oss参考文档](https://help.aliyun.com/document_detail/44688.htm?spm=a2c4g.11186623.2.8.5b7ff2ee8dxQ8X#title-dz0-c5s-ulp)
export type ResizeMode =
// 等比缩放，缩放图限制为指定w与h的矩形内的最大图片。
  'lfit' |
  // 等比缩放，缩放图为延伸出指定w与h的矩形框外的最小图片。
  'mfit' |
  // 将原图等比缩放为延伸出指定w与h的矩形框外的最小图片，之后将超出的部分进行居中裁剪。
  'fill' |
  // 将原图缩放为指定w与h的矩形内的最大图片，之后使用指定颜色居中填充空白部分。
  'pad' |
  // 固定宽高，强制缩放。
  'fixed'

type resizeOptions = {
  [key: string]: number | string | boolean | undefined
  // 指定缩放的模式。
  m?: ResizeMode,
  w?: number, h?: number,
  // 指定目标缩放图的最长边。
  l?: number,
  // 指定目标缩放图的最短边。
  s?: number,
  // 指定当目标缩放图大于原图时是否进行缩放。
  limit?: boolean,
  // 当缩放模式选择为pad（缩放填充）时，可以设置填充的颜色。
  color?: string
}

type actions =
  '' |
  // 调整大小
  'resize' |
  // 图片水印
  'watermark'

class ImageAction extends Action<actions> {}

class ImageStream extends Stream<string> {
  protected actions: Array<ImageAction> = []
  protected preEnd(): void {
    if (this.actions.length > 0) {
      this.ctx += '?x-oss-process=image'
      this.actions.forEach(
        action => this.ctx += '/' + Action.toString(action)
      )
    }
  }

  resize (option: resizeOptions) {
    const params = []
    for (const optionKey in option) {
      params.push(`${optionKey}_${option[optionKey]}`)
    }
    this.actions.push({
      name: 'resize', params: params
    })
    return this
  }
}

export default class ImgHelper {
  static init(url: string): ImageStream {
    return new ImageStream(url)
  }
}
