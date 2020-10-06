import { should, expect } from 'chai'; should();
import { ContentPlugin, Plugin, PluginFactory } from '../../plugin';
import { RendererLike } from '../../types';


export function testContentExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: PluginFactory<N, R>[]) => R
) {
  it('should utilize provided content plugins for setting content.', done => {
    const _t = {}; const _n = {} as N;
    class P extends Plugin<N, R> implements ContentPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      setContent(node: N, target: any) {
        expect(node).to.equal(_n);
        expect(target).to.equal(_t);
        done();

        return false;
      }
    }
    const r = factory(() => new P());
    r.setContent(_n, _t);
  });

  it('should utilize first of provided content plugins that returns true in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements ContentPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      setContent() { return !!res.push('A') || true; }
    }
    class P2 extends Plugin<N, R> implements ContentPlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      setContent() { return !!res.push('B') && false; }
    }
    class P3 extends Plugin<N, R> implements ContentPlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      setContent() { return !!res.push('C') || true; }
    }
    const r = factory(() => new P1(), () => new P2(), () => new P3());
    r.setContent(undefined as any, undefined);
    res.should.eql(['B', 'C']);
  });
}
