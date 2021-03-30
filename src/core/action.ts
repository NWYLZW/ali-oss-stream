export default class Action<T extends string> {
  name: T | undefined
  params: Array<String> = []

  static toString(t: Action<string>) {
    return `${t.name},${t.params.join(',')}`
  }
}
