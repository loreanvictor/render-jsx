import { should, expect } from 'chai'; should();
import { AppendPlugin, Plugin } from '../../plugin';
import { RendererLike } from '../../types';


export function testAppendExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: Plugin<N, R>[]) => R
) {
  it('should utilize provided append plugins for appending.', done => {
    const _t = {}; const _h = {} as N;
    class P extends Plugin<N, R> implements AppendPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      append(target: any, host: N) {
        target.should.equal(_t);
        expect(host).to.equal(_h);
        done();

        return false;
      }
    }
    const r = factory(new P());
    r.append(_t, _h);
  });

  it('should utilize first of provided append plugins that returns true in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements AppendPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      append() { return !!res.push('A') || true; }
    }
    class P2 extends Plugin<N, R> implements AppendPlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      append() { return !!res.push('B') && false; }
    }
    class P3 extends Plugin<N, R> implements AppendPlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      append() { return !!res.push('C') || true; }
    }
    const r = factory(new P1(), new P2(), new P3());
    r.append(undefined, undefined as any);
    res.should.eql(['B', 'C']);
  });
}
