import { should, expect } from 'chai'; should();
import { LeafPlugin, Plugin } from '../../plugin';
import { RendererLike } from '../../types';


export function testLeafExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: Plugin<N, R>[]) => R
) {
  it('should utilize provided leaf plugins for creating leaf nodes.', done => {
    class P extends Plugin<N, R> implements LeafPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      leaf(): N {
        done();

        return undefined as any;
      }
    }
    const r = factory(new P());
    r.leaf();
  });

  it('should utilize the first provided leaf plugin in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements LeafPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      leaf() { return res.push('A') as any; }
    }
    class P2 extends Plugin<N, R> implements LeafPlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      leaf() { return res.push('B') as any; }
    }
    class P3 extends Plugin<N, R> implements LeafPlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      leaf() { return res.push('C') as any; }
    }
    const r = factory(new P1(), new P2(), new P3());
    r.leaf();
    res.should.eql(['B']);
  });
}
