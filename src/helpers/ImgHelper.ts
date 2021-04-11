import Stream from '../core/stream'
import Action, { ItfAction } from '../core/action'
import { Helper } from './index'

/**
 * [阿里oss参考文档](https://help.aliyun.com/document_detail/44688.htm?spm=a2c4g.11186623.2.8.5b7ff2ee8dxQ8X#title-dz0-c5s-ulp)
 *
 * - 'lfit'  等比缩放，缩放图限制为指定w与h的矩形内的最大图片。
 * - 'mfit'  等比缩放，缩放图为延伸出指定w与h的矩形框外的最小图片。
 * - 'fill'  将原图等比缩放为延伸出指定w与h的矩形框外的最小图片，之后将超出的部分进行居中裁剪。
 * - 'pad'   将原图缩放为指定w与h的矩形内的最大图片，之后使用指定颜色居中填充空白部分。
 * - 'fixed' 固定宽高，强制缩放。
 */
export type ResizeMode = 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed'

export type Options = Record<string, number | string | boolean | undefined>

/**
 * 调整大小配置参数
 *
 * - 'm' 指定缩放的模式。
 * - 'w' 调整宽度。
 * - 'h' 调整高度。
 * - 'l' 指定目标缩放图的最长边。
 * - 's' 指定目标缩放图的最短边。
 * - 'limit' 指定当目标缩放图大于原图时是否进行缩放。
 * - 'color' 当缩放模式选择为pad（缩放填充）时，可以设置填充的颜色。
 */
type ResizeOptions = {
  m?: ResizeMode
  w?: number
  h?: number
  l?: number
  s?: number
  limit?: boolean
  color?: string
} & Options

type WatermarkOptions = {} & Options

/**
 * [可选择的action类型](https://help.aliyun.com/document_detail/183902.html?spm=a2c4g.11186623.6.746.68eb7fd8lmUm0t#title-cya-7jq-mzs)
 *
 * - 'format'          将图片转换为HEIF或WebP M6等高压缩比格式。转换图片格式。
 * - 'resize'          将图片缩放至指定大小。
 * - 'circle'          以图片中心点为圆心，裁剪出指定大小的圆形图片。
 * - 'crop'            裁剪指定大小的矩形图片。
 * - 'indexcrop'       按指定x或y轴的大小切分图片，之后选取其中一张图片。
 * - 'rounded-corners' 按指定圆角大小将图片裁剪成圆角矩形。
 * - 'auto-orient'     将携带旋转参数的图片进行自适应旋转。
 * - 'rotate'          按指定角度以顺时针方向旋转图片。
 * - 'blur'            对图片进行模糊处理。
 * - 'bright'          调整图片亮度。
 * - 'sharpen'         对图片进行锐化处理。
 * - 'contrast'        调整图片对比度。
 * - 'interlace'       将JPG格式的图片调整为渐进显示。
 * - 'quality'         调整JPG和WebP格式图片的质量。
 * - 'watermark'       为图片添加图片或文字水印。
 * - 'average-hue'     获取图片主色调。
 * - 'info'            获取图片信息，包括基本信息、EXIF信息。
 */
type Actions =
  'format' | 'resize' | 'circle' | 'crop' | 'indexcrop' |
  'rounded-corners' | 'auto-orient' | 'rotate' | 'blur' |
  'bright' | 'sharpen' | 'contrast' | 'interlace' | 'quality' |
  'watermark' | 'average-hue' | 'info'

type OptionsMap<A = Actions> =
  A extends 'resize'?
    ResizeOptions :
  A extends 'watermark'?
    WatermarkOptions :
    Options

type ImageAction = ItfAction<Actions>

export class ImageStream extends Stream<string> {
  protected actions: Array<ImageAction> = []
  protected queries: Record<string, string> = {}

  protected preEnd(): void {
    if (this.ctx === undefined) return

    if (this.actions.length > 0) {
      this.ctx += '?x-oss-process=image'
      this.actions.forEach(
        action => this.ctx += '/' + Action.toString(action)
      )
    }
    if (this.queries !== {}) {
      if (!/\?x-oss-process=image.*$/.test(this.ctx)) {
        this.ctx += '?'
        for (const queriesKey in this.queries) {
          this.ctx += `${queriesKey}=${this.queries[queriesKey]}&`
        }
        this.ctx = this.ctx.slice(0, this.ctx.length - 1)
      } else {
        for (const queriesKey in this.queries) {
          this.ctx += `&${queriesKey}=${this.queries[queriesKey]}`
        }
      }
    }
  }

  /**
   * 添加一个query
   *
   * @param key 键名
   * @param val 键值
   */
  pushQuery(key: string, val: string): ImageStream {
    this.queries[key] = val
    return this
  }

  /**
   * 添加queries
   *
   * @param queries queries字典
   */
  pushQueries(queries: Record<string, string>): ImageStream {
    this.queries = {
      ...this.queries, ...queries
    }
    return this
  }

  /**
   * 添加options
   *
   * @param name    options的类型
   * @param options 配置参数
   */
 pushOptions<A extends Actions>(name: A, options: OptionsMap<A>): ImageStream {
    const params = []
    for (const optionKey in options) {
      params.push(`${optionKey}_${options[optionKey]}`)
    }
    this.actions.push({ name, params })
    return this
  }

  /**
   * 重载 pushOptions
   */
  pushAction = this.pushOptions

  /**
   * [阿里oss 图片缩放参考文档](https://help.aliyun.com/document_detail/44688.htm?spm=a2c4g.11186623.2.8.5b7ff2ee8dxQ8X#title-dz0-c5s-ulp)
   *
   * @param resizeOptions - 缩放配置参数
   * @return ImageStream
   */
  resize(resizeOptions: ResizeOptions): ImageStream {
    return this.pushAction('resize', resizeOptions)
  }
}

export const imgHelper: Helper<string, ImageStream>
  = (url: string): ImageStream => new ImageStream(url)
