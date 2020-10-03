export class UnresolvedRefError<T> extends Error {
  /*istanbul ignore next*/
  constructor(readonly ref: RefLike<T>) {
    super(`Referenced value read before it was resolved.`);
    Object.setPrototypeOf(this, UnresolvedRefError.prototype);
  }
}
