import { should, expect } from 'chai'; should();
import { AppendPlugin, Plugin } from '../plugin';
import { RendererLike } from '../types';


export function testRendererExtensibility
  <N, R extends RendererLike<N>>(
  factory: (...plugins: Plugin<N, R>[]) => R
) {
  it('should utilize provided append plugins for appending.', done => {
    const _t = {}; const _h = {} as N;
    class AP extends Plugin<N, R> implements AppendPlugin<N, R> {
      priority(): number {
        return Plugin.PriorityFallback;
      }
      append(target: any, host: N): boolean {
        target.should.eql(_t);
        expect(host).to.eql(_h);
        done();

        return false;
      }
    }
    const r = factory(new AP());
    r.append(_t, _h);
  });
}
