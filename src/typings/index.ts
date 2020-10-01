//
// EXPLANATION:
//
// Type definition files can only be imported in other type definition files.
// To ensure that other type definition files are found and utilized by Typescript,
// this file `typings/index.ts` has a custom type definition file which imports
// all typings. This file itself is then imported by main package index (exporting
// a constant so that it is not ommited by any optmizer), which ensures Typescript
// also reading and utilizing other type definitions in this folder.
//
const TYPINGS_IMPORTED = true;
export { TYPINGS_IMPORTED };
