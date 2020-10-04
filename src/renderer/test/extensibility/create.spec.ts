/* tslint:disable: newline-before-return */
/* tslint:disable: no-magic-numbers */

import { should, expect } from 'chai'; should();
import { CreatePlugin, Plugin } from '../../plugin';
import { RendererLike } from '../../types';


export function testCreateExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: Plugin<N, R>[]) => R
) {
  it('should utilize provided create plugins for creating nodes.', done => {
    const _t = {}; const _p = {}; const _c1 = {}; const _c2 = {};
    class P extends Plugin<N, R> implements CreatePlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      create(tag: any, props?: { [prop: string]: any; }, ...children: any[]): N | undefined {
        _t.should.equal(tag);
        _p.should.equal(props);
        expect(children[0]).to.equal(_c1);
        expect(children[1]).to.equal(_c2);
        expect(children.length).to.equal(2);
        done();

        return undefined;
      }
    }
    const r = factory(new P());
    r.create(_t, _p, _c1, _c2);
  });

  it('should utilize first create plugin that returns something in order of priority.', () => {
    const res: string[] = [];
    class P1 extends Plugin<N, R> implements CreatePlugin<N, R> {
      priority() { return Plugin.PriorityFallback; }
      create() { res.push('A'); return 42 as any; }
    }
    class P2 extends Plugin<N, R> implements CreatePlugin<N, R> {
      priority() { return Plugin.PriorityMax; }
      create() { res.push('B'); return undefined; }
    }
    class P3 extends Plugin<N, R> implements CreatePlugin<N, R> {
      priority() { return (Plugin.PriorityFallback + Plugin.PriorityMax) / 2; }
      create() { res.push('C'); return 42 as any; }
    }
    const r = factory(new P1(), new P2(), new P3());
    r.create(undefined);
    res.should.eql(['B', 'C']);
  });
}
