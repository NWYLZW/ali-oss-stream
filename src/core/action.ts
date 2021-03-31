export default class Action<T extends string> {
  name: T | undefined
  params: Array<string> = []

  static toString(t: Action<string>): string {
    return `${t.name},${t.params.join(',')}`
  }
}
