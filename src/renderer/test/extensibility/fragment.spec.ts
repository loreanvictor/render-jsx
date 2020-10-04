/* tslint:disable: no-unused-expression */

import { should, expect } from 'chai'; should();
import { FragmentPlugin, Plugin } from '../../plugin';
import { RendererLike } from '../../types';


export function testFragmentExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: Plugin<N, R>[]) => R
) {
  it('should utilize provided fragment plugins for creating fragments.', done => {
    class P extends Plugin<N, R> implements FragmentPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      fragment(): N {
        done();

        return undefined as any;
      }
    }
    const r = factory(new P());
    r.fragment;
  });

  it('should utilize the first provided fragment plugin in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements FragmentPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      fragment() { return res.push('A') as any; }
    }
    class P2 extends Plugin<N, R> implements FragmentPlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      fragment() { return res.push('B') as any; }
    }
    class P3 extends Plugin<N, R> implements FragmentPlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      fragment() { return res.push('C') as any; }
    }
    const r = factory(new P1(), new P2(), new P3());
    r.fragment;
    res.should.eql(['B']);
  });
}
