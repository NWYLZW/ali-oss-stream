export default abstract class Stream<T> {
  protected abstract preEnd(): any

  protected ctx: T | undefined = undefined
  constructor(ctx: T) {
    this.ctx = ctx
  }
  end() {
    this.preEnd()
    return this.ctx
  }
}
