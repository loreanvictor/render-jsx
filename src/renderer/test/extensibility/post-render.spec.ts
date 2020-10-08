/* tslint:disable: no-magic-numbers */

import { should, expect } from 'chai'; should();
import { PostRenderPlugin, Plugin, PluginFactory } from '../../plugin';
import { RendererLike } from '../../types';


export function testPostRenderOnExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: PluginFactory<N, R>[]) => R
) {
  it('should invoke provided post-render plugins after a node is rendered on another node.', () => {
    const res: N[] = [];
    class P extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      postRender(node: N) { res.push(node); }
    }
    const r = factory(() => new P());
    const h = r.create(r.fragment);
    const x1 = r.leaf();
    const x2 = r.leaf();
    r.render(x1).on(h);
    r.render(x2).on(h);
    expect(res[0]).to.equal(x1);
    expect(res[1]).to.equal(x2);
    expect(res.length).to.equal(2);
  });

  it('should invoke provided post-render plugins in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      postRender() { res.push('A'); }
    }
    class P2 extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      postRender() { res.push('B'); }
    }
    class P3 extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      postRender() { res.push('C'); }
    }
    const r = factory(() => new P1(), () => new P2(), () => new P3());
    const h = r.create(r.fragment);
    const x = r.leaf();
    r.render(x).on(h);
    res.should.eql(['B', 'C', 'A']);
  });
}

export function testPostRenderBeforeExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: PluginFactory<N, R>[]) => R
) {
  it('should invoke provided post-render plugins after a node is rendered before another node.', () => {
    const res: N[] = [];
    class P extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      postRender(node: N) { res.push(node); }
    }
    const r = factory(() => new P());
    const h = r.create(r.fragment);
    const x = r.leaf();
    const x1 = r.leaf();
    const x2 = r.leaf();
    r.render(x).on(h);
    r.render(x1).before(x);
    r.render(x2).before(x);
    expect(res[1]).to.equal(x1);
    expect(res[2]).to.equal(x2);
    expect(res.length).to.equal(3);
  });

  it('should invoke provided post-render plugins in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      postRender() { res.push('A'); }
    }
    class P2 extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      postRender() { res.push('B'); }
    }
    class P3 extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      postRender() { res.push('C'); }
    }
    const r = factory(() => new P1(), () => new P2(), () => new P3());
    const h = r.create(r.fragment);
    const x = r.leaf();
    const y = r.leaf();
    r.render(x).on(h);
    r.render(y).before(x);
    res.should.eql(['B', 'C', 'A', 'B', 'C', 'A']);
  });
}

export function testPostRenderAfterExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: PluginFactory<N, R>[]) => R
) {
  it('should invoke provided post-render plugins after a node is rendered after another node.', () => {
    const res: N[] = [];
    class P extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      postRender(node: N) { res.push(node); }
    }
    const r = factory(() => new P());
    const h = r.create(r.fragment);
    const x = r.leaf();
    const x1 = r.leaf();
    const x2 = r.leaf();
    r.render(x).on(h);
    r.render(x1).after(x);
    r.render(x2).after(x);
    expect(res[1]).to.equal(x1);
    expect(res[2]).to.equal(x2);
    expect(res.length).to.equal(3);
  });

  it('should invoke provided post-render plugins in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      postRender() { res.push('A'); }
    }
    class P2 extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      postRender() { res.push('B'); }
    }
    class P3 extends Plugin<N, R> implements PostRenderPlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      postRender() { res.push('C'); }
    }
    const r = factory(() => new P1(), () => new P2(), () => new P3());
    const h = r.create(r.fragment);
    const x = r.leaf();
    const y = r.leaf();
    r.render(x).on(h);
    r.render(y).after(x);
    res.should.eql(['B', 'C', 'A', 'B', 'C', 'A']);
  });
}
