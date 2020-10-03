export class RefAlreadyResolvedError<T> extends Error {
  /*istanbul ignore next*/
  constructor(readonly ref: RefLike<T>) {
    super(`Attempting to resolve an already-resolved reference.`);
    Object.setPrototypeOf(this, RefAlreadyResolvedError.prototype);
  }
}
