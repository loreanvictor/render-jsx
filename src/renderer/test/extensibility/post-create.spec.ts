/* tslint:disable: newline-before-return */

import { should, expect } from 'chai'; should();
import { PostCreatePlugin, Plugin } from '../../plugin';
import { RendererLike } from '../../types';


export function testPostCreateExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: Plugin<N, R>[]) => R
) {
  it('should invoke provided post-create plugins after a node is created.', () => {
    const res: N[] = [];
    class P extends Plugin<N, R> implements PostCreatePlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      postCreate(node: N) { res.push(node); }
    }
    const r = factory(new P());
    const x1 = r.create(r.fragment);
    const x2 = r.create(r.fragment);
    expect(res[0]).to.equal(x1);
    expect(res[1]).to.equal(x2);
    expect(res.length).to.equal(2);
  });

  it('should invoke provided post-create plugins in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements PostCreatePlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      postCreate() { res.push('A'); }
    }
    class P2 extends Plugin<N, R> implements PostCreatePlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      postCreate() { res.push('B'); }
    }
    class P3 extends Plugin<N, R> implements PostCreatePlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      postCreate() { res.push('C'); }
    }
    const r = factory(new P1(), new P2(), new P3());
    r.create(r.fragment);
    res.should.eql(['B', 'C', 'A']);
  });
}
