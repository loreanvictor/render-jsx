import { LifeCycleHook } from '../../renderer';


export interface LifeCycleInfo {
  hooks?: LifeCycleHook[];
  bound: boolean;
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
    marker = fragment.ownerDocument?.createElement('i');
    marker.setAttribute('hidden', '');
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
  // TODO: is it perhaps a good idea to track
  //       whether life-cycle is already cleared
  //       and avoid re-iterating over nodes again
  //       and again?
  const lifecycle = lifeCycleInfo(node);
  if (lifecycle) {
    lifecycle.hooks?.forEach(c => c.clear ? c.clear() : undefined);
  }

  node.childNodes.forEach(lifeCycleClear);
}


export function lifeCycleBind(node: Node) {
  const lifecycle = lifeCycleInfo(node);
  if (lifecycle) {
    /*istanbul ignore next*/
    if (lifecycle.bound) {
      return;
    }

    lifecycle.bound = true;
    lifecycle.hooks?.forEach(b => b.bind ? b.bind() : undefined);
  }

  node.childNodes.forEach(lifeCycleBind);
}


export function attachLifeCycleHook(hook: LifeCycleHook, node: Node) {
  const lifecycle = lifeCycleInfo(node, true);
  lifecycle.hooks = lifecycle.hooks || [];
  lifecycle.hooks.push(hook);
}

/*istanbul ignore next*/
export function detachLifeCycleHook(hook: LifeCycleHook, node: Node) {
  const lifecycle = lifeCycleInfo(node);
  if (lifecycle && lifecycle.hooks) {
    lifecycle.hooks = lifecycle.hooks.filter(h => h !== hook);
  }
}
