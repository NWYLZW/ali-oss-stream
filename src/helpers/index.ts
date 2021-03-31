import Stream from 'ali-oss-stream/core/stream'

export interface Helper<M, T extends Stream<M>> {
  (url: M): T
}
