import { LifeCycleHook } from '../../renderer';


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
  if (node.nodeType === node.ELEMENT_NODE) {
    if ('lc_cleared' in (node as HTMLElement).dataset) { return; }
    (node as HTMLElement).dataset['lc_cleared'] = 't';
  }
  const ev = new CustomEvent('lc_clear', { bubbles: false });
  node.dispatchEvent(ev);
  const children = node.childNodes;
  for (let i = 0, child = children.item(i); i < children.length; child = children.item(++i)) {
    lifeCycleClear(child);
  }
}


export function lifeCycleBind(node: Node) {
  if (node.nodeType === node.ELEMENT_NODE) {
    if ('lc_bound' in (node as HTMLElement).dataset) { return; }
    (node as HTMLElement).dataset['lc_bound'] = 't';
  }
  const ev = new CustomEvent('lc_bind', { bubbles: false });
  node.dispatchEvent(ev);
  const children = node.childNodes;
  for (let i = 0, child = children.item(i); i < children.length; child = children.item(++i)) {
    lifeCycleBind(child);
  }
}


export function attachLifeCycleHook(hook: LifeCycleHook, node: Node) {
  if (node.nodeType === node.DOCUMENT_FRAGMENT_NODE) {
    let marker = getLifeCycleMarker(node as DocumentFragment);
    if (!marker) {
      marker = node.ownerDocument?.createTextNode('')!!;
      setLifeCycleMarker(node as DocumentFragment, marker);
    }
    attachLifeCycleHook(hook, marker);

    return;
  }
  if (hook.bind) {
    node.addEventListener('lc_bind', hook.bind, { once: true });
  }
  if (hook.clear) {
    node.addEventListener('lc_clear', hook.clear, { once: true });
  }
}
