export interface LiveDOMComponentThis {
  onBind: (fn: () => void) => void;
  onClear: (fn: () => void) => void;
}
