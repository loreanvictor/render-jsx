import { LifeCycleHook } from '../../renderer';


export interface LifeCycleInfo {
  binds?: (() => void)[];
  clears?: (() => void)[];
  bound: boolean;
  cleared: boolean;
}


export function lifeCycleInfo(node: Node, createIfNonExistent: true): LifeCycleInfo;
export function lifeCycleInfo(node: Node, createIfNonExistent?: boolean): LifeCycleInfo | undefined;
export function lifeCycleInfo(node: Node, createIfNonExistent = false): LifeCycleInfo | undefined {
  const _node = node as any;

  if (node.nodeType === node.DOCUMENT_FRAGMENT_NODE) {
    return fragmentLifeCycleInfo(node as DocumentFragment, createIfNonExistent);
  }
  else {
    if (_node.lifecycle) {
      return _node.lifecycle as LifeCycleInfo;
    }
    else if (createIfNonExistent) {
      _node.lifecycle = <LifeCycleInfo>{ bound: false };

      return _node.lifecycle;
    }
  }
}


export function fragmentLifeCycleInfo(fragment: DocumentFragment, createIfNonExistent: boolean) {
  let marker = getLifeCycleMarker(fragment);
  /*istanbul ignore if*/
  if (marker) {
    return lifeCycleInfo(marker, createIfNonExistent);
  } else if (createIfNonExistent) {
    marker = fragment.ownerDocument?.createTextNode('');
    setLifeCycleMarker(fragment, marker);

    return lifeCycleInfo(marker, true);
  }
}


export function setLifeCycleMarker(fragment: DocumentFragment, marker: Node) {
  (fragment as any).lifecycleMarker = marker;
  if (!fragment.contains(marker)) {
    fragment.appendChild(marker);
  }
}

export function getLifeCycleMarker(fragment: DocumentFragment) {
  return (fragment as any).lifecycleMarker;
}


export function lifeCycleClear(node: Node) {
  const lifecycle = lifeCycleInfo(node);
  if (lifecycle) {
    /*istanbul ignore next*/
    if (lifecycle.cleared) {
      return;
    }
    lifecycle.cleared = true;
    if (lifecycle.clears) {
      for (let i = 0, clear = lifecycle.clears[i]; i < lifecycle.clears.length; clear = lifecycle.clears[++i]) {
        clear();
      }

      lifecycle.clears = undefined;
    }
  }

  const children = node.childNodes;
  for (let i = 0, child = children.item(i); i < children.length; child = children.item(++i)) {
    lifeCycleClear(child);
  }
}


export function lifeCycleBind(node: Node) {
  const lifecycle = lifeCycleInfo(node);
  if (lifecycle) {
    /*istanbul ignore next*/
    if (lifecycle.bound) {
      return;
    }

    lifecycle.bound = true;
    if (lifecycle.binds) {
      for (let i = 0, bind = lifecycle.binds[i]; i < lifecycle.binds.length; bind = lifecycle.binds[++i]) {
        bind();
      }
    }

    lifecycle.binds = undefined;
  }

  const children = node.childNodes;
  for (let i = 0, child = children.item(i); i < children.length; child = children.item(++i)) {
    lifeCycleBind(child);
  }
}


export function attachLifeCycleHook(hook: LifeCycleHook, node: Node) {
  const lifecycle = lifeCycleInfo(node, true);
  if (hook.bind) {
    (lifecycle.binds || (lifecycle.binds = [])).push(hook.bind);
  }
  if (hook.clear) {
    (lifecycle.clears || (lifecycle.clears = [])).push(hook.clear);
  }
}
