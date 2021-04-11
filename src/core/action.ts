export interface ItfAction<T extends string> {
  name: T
  params: Array<string>
}

export default class Action {
  static toString<T extends string>(t: ItfAction<T>): string {
    return `${t.name},${t.params.join(',')}`
  }
}
