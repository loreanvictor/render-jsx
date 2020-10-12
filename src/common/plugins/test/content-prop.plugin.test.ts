/* tslint:disable: newline-before-return */
import { Plugin, PropPlugin, Renderer } from '../../../renderer';
import { ContentPropPlugin } from '../content-prop.plugin';
import { testContentPropSupport } from './spec/content-prop.spec';

class R extends Renderer<any, R> {
  fallbackAppend(_target: any, _host: any): void {}
  fallbackSetProp(_node: any, _prop: string, _target: any): void {}
  fallbackSetContent(_node: any, _target: any) { _node.$content = _target; }
  fallbackFragment() {}
  fallbackLeaf() {}
  fallbackCreate(_tag: any, _props?: { [prop: string]: any; }) { return {}; }
  renderOn(_target: any, _host: any): void {}
  renderAfter(_target: any, _ref: any): void {}
  renderBefore(_target: any, _ref: any): void {}
  remove(_target: any) {}
  clone(...plugins: any[]) { return new R(...plugins); }
}

describe('ContentPropPlugin', () => {
  testContentPropSupport((...plugins) =>
    new R()
    .plug(() => new ContentPropPlugin())
    .plug(...plugins),
    (node: any) => node.$content
  );

  it('should ignore props that are not equal to `_content`.', done => {
    class P extends Plugin<any> implements PropPlugin<any> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new R().plug(() => new ContentPropPlugin(), () => new P());
    r.create('ladida', {content: 'Halo'});
  });

  it('should ignore when given prop is not a string.', done => {
    class P extends Plugin<any> implements PropPlugin<any> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new R().plug(() => new ContentPropPlugin(), () => new P());
    r.create('ladida', {_content: 42});
  });
});
