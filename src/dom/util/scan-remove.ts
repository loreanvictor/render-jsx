export interface ScanOptions {
  includeStart?: boolean;
  includeEnd?: boolean;
  remove?: (n: Node) => void;
  callback?: (n: Node) => void;
}


export function scanRemove(start: Node, end: Node, options?: ScanOptions) {
  const opts = {
    includeStart: false,
    includeEnd: false,
    remove: (n: Node) => n.parentElement!!.removeChild(n),
    callback: undefined,
    ...options
  };

  let scanned : Node[] = [];

  const _remscan = (n: Node, cb: (n: Node) => void = _n => scanned.push(_n)) => {
    opts.remove(n);
    if (opts.callback) {
      opts.callback(n);
    }
    cb(n);
  };

  let cursor : Node | null = start;
  while ((cursor = start.nextSibling) && cursor !== end) {
    _remscan(cursor);
  }

  if (opts.includeStart) {
    _remscan(start, n => scanned = [n].concat(scanned));
  }
  if (opts.includeEnd) {
    _remscan(end);
  }

  return scanned;
}
