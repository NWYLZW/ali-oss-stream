export default abstract class Stream<T> {
  protected abstract preEnd(): void

  protected ctx: T | undefined = undefined
  constructor(ctx: T) {
    this.ctx = ctx
  }
  end(): T | undefined {
    this.preEnd()
    return this.ctx
  }
}
