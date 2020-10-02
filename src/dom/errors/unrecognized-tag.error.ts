export class UnrecognizedTagError extends Error {
  constructor(tag: any) {
    super(`Given tag is not recognized: ${tag}`);
  }
}
