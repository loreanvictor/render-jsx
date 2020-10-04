import { should, expect } from 'chai'; should();
import { PropPlugin, Plugin } from '../../plugin';
import { RendererLike } from '../../types';


export function testPropExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: Plugin<N, R>[]) => R
) {
  it('should utilize provided prop plugins for setting properties.', done => {
    const _t = {}; const _n = {} as N; const _p = 'all-work-and-no-play';
    class P extends Plugin<N, R> implements PropPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      setProp(node: N, prop: string, target: any) {
        expect(node).to.equal(_n);
        expect(prop).to.equal(_p);
        expect(target).to.equal(_t);
        done();

        return false;
      }
    }
    const r = factory(new P());
    r.setProp(_n, _p, _t);
  });

  it('should utilize first of provided prop plugins that returns true in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements PropPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { return !!res.push('A') || true; }
    }
    class P2 extends Plugin<N, R> implements PropPlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      setProp() { return !!res.push('B') && false; }
    }
    class P3 extends Plugin<N, R> implements PropPlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      setProp() { return !!res.push('C') || true; }
    }
    const r = factory(new P1(), new P2(), new P3());
    r.setProp(undefined as any, '', undefined);
    res.should.eql(['B', 'C']);
  });
}
