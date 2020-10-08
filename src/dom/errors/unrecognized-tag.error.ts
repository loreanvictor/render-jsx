export class UnrecognizedTagError extends Error {
  /*istanbul ignore next*/
  constructor(tag: any) {
    super(`Given tag is not recognized: ${tag}`);
  }
}
