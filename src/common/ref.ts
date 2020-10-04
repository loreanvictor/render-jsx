/*global RefLike*/

import { UnresolvedRefError, RefAlreadyResolvedError } from './errors';


export class Ref<T> implements RefLike<T> {
  _resolved: boolean = false;
  _$: T;

  public get resolved() {
    return this.isResolved();
  }

  public isResolved() {
    return this._resolved;
  }

  public get $() {
    if (!this.isResolved()) {
      throw new UnresolvedRefError(this);
    }

    return this._$;
  }

  public resolve(t: T) {
    if (this.isResolved()) {
      throw new RefAlreadyResolvedError(this);
    }

    this._$ = t;
    this._resolved = true;
  }
}


export function ref<T = Node>() {
  return new Ref<T>();
}
