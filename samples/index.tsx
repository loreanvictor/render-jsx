import { Renderer } from '../src';


export class JSONRenderer extends Renderer<any> {
  fallbackAppend(target: any, host: any): void {
    host?.children?.push(target);
  }

  fallbackSetProp(node: any,prop: string,target: any): void {
    node[prop] = target;
  }

  fallbackCreate(tag: any, props?: { [prop: string]: any; }, ...children: any[]) {
    return {
      tag,
      props,
      children
    }
  }

  fallbackSetContent(node: any,target: any): void {}
  fallbackFragment() { return {}; }
  renderOn(target: any, host: any): void {}
  renderAfter(target: any, ref: any): void {}
  renderBefore(target: any, ref: any): void {}
}

const renderer = new JSONRenderer();
console.log(<div>Hellow <span>World!</span></div>);