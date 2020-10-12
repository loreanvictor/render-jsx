/* tslint:disable: newline-before-return */
import { Plugin, PropPlugin, Renderer } from '../../../renderer';
import { ref } from '../../ref';
import { RefPlugin } from '../ref.plugin';
import { testRefPropSupport } from './spec/ref.spec';

class R extends Renderer<any, R> {
  fallbackAppend(_target: any, _host: any): void {}
  fallbackSetProp(_node: any, _prop: string, _target: any): void {}
  fallbackSetContent(_node: any, _target: any): void {}
  fallbackFragment() {}
  fallbackLeaf() {}
  fallbackCreate(_tag: any, _props?: { [prop: string]: any; }) { return {}; }
  renderOn(_target: any, _host: any): void {}
  renderAfter(_target: any, _ref: any): void {}
  renderBefore(_target: any, _ref: any): void {}
  remove(_target: any) {}
  clone(...plugins: any[]) { return new R(...plugins); }
}

describe('RefPlugin', () => {
  testRefPropSupport((...plugins) =>
    new R()
    .plug(() => new RefPlugin())
    .plug(...plugins)
  );

  it('should ignore props that are not equal to `_ref`.', done => {
    class P extends Plugin<any> implements PropPlugin<any> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new R().plug(() => new RefPlugin(), () => new P());
    r.create('ladida', {ref: ref()});
  });

  it('should ignore when given prop is not a ref.', done => {
    class P extends Plugin<any> implements PropPlugin<any> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new R().plug(() => new RefPlugin(), () => new P());
    r.create('ladida', {_ref: 42});
  });
});
