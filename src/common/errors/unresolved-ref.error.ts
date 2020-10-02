export class UnresolvedRefError<T> extends Error {
  constructor(readonly ref: RefLike<T>) {
    super(`Referenced value read before it was resolved.`);
  }
}
