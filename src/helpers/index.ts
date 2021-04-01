import Stream from '../core/stream'

export interface Helper<M, T extends Stream<M>> {
  (url: M): T
}
