import { LifeCycleHook } from '../renderer';


export interface LifeCycleInfo {
  hooks?: LifeCycleHook[];
  bound: boolean;
}


export function lifeCycleInfo(node: Node): LifeCycleInfo | undefined;
export function lifeCycleInfo(node: Node, createIfNonExistent: true): LifeCycleInfo;
export function lifeCycleInfo(node: Node, createIfNonExistent: boolean): LifeCycleInfo | undefined;
export function lifeCycleInfo(node: Node, createIfNonExistent: boolean = false): LifeCycleInfo | undefined {
  let _node = node as any;

  if (node instanceof DocumentFragment) {
    let marker = getLifeCycleMarker(node);
    if (marker) return lifeCycleInfo(marker, createIfNonExistent);
    else if (createIfNonExistent) {
      marker = document.createElement('i');
      marker.setAttribute('hidden', '');
      setLifeCycleMarker(node, marker);
      return lifeCycleInfo(marker, true);
    }
  }
  else {
    if (_node.lifecycle) return _node.lifecycle as LifeCycleInfo;
    else if (createIfNonExistent) {
      _node.lifecycle = <LifeCycleInfo>{ bound: false };
      return _node.lifecycle;
    }
  }
}


export function setLifeCycleMarker(fragment: DocumentFragment, marker: Node) {
  (fragment as any).lifecycleMarker = marker;
  if (!fragment.contains(marker))
    fragment.appendChild(marker);
}

export function getLifeCycleMarker(fragment: DocumentFragment) {
  return (fragment as any).lifecycleMarker;
}


export function bind(node: Node) {
  let lifecycle = lifeCycleInfo(node);
  if (lifecycle) {
    if (lifecycle.bound) return;

    lifecycle.bound = true;
    lifecycle.hooks?.forEach(b => b.bind ? b.bind() : undefined);
  }

  node.childNodes.forEach(bind);

  if (node.parentNode && !(node.parentNode as any).childObserver) {
    let observer = new MutationObserver(changes => {
      changes.forEach(change => {
        if (change.removedNodes)
          change.removedNodes.forEach(node => setImmediate(() => {
            if (!document.contains(node))
              clear(node);
          }));
      });
    });

    observer.observe(node.parentNode, { childList: true });
    (node.parentNode as any).childObserver = observer;
    attach({
      clear() { observer.disconnect(); }
    }, node.parentNode);
  }
}


export function clear(node: Node) {
  let lifecycle = lifeCycleInfo(node);
  if (lifecycle) lifecycle.hooks?.forEach(c => c.clear ? c.clear() : undefined);

  node.childNodes.forEach(clear);
}

export function attach(hook: LifeCycleHook, node: Node) {
  const lifecycle = lifeCycleInfo(node, true);
  lifecycle.hooks = lifecycle.hooks || [];
  lifecycle.hooks.push(hook);
}


export function detach(hook: LifeCycleHook, node: Node) {
  let lifecycle = lifeCycleInfo(node);
  if (lifecycle && lifecycle.hooks) {
    lifecycle.hooks = lifecycle.hooks.filter(h => h !== hook);
  }
}


export const LifeCycle = {
  info: lifeCycleInfo,
  getMarker: getLifeCycleMarker,
  setMarker: setLifeCycleMarker,
  bind,
  clear,
  attach,
  detach
}