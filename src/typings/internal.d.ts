declare type RawValue = string | number | boolean;

declare interface RefLike<T> {
  resolved: boolean;
  $: T;
  resolve($: T): void;
}