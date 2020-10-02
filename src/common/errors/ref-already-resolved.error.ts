export class RefAlreadyResolvedError<T> extends Error {
  constructor(readonly ref: RefLike<T>) {
    super(`Attempting to resolve an already-resolved reference.`);
  }
}
