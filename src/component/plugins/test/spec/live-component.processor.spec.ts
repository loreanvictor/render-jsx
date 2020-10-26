/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import { LiveRendererLike, PluginFactory } from '../../../../renderer';
import { LiveComponentThis } from '../../live-component.processor';


export function testComponentLifeCycleHooksSupport
  <N, R extends LiveRendererLike<N>>(
  factory: (...plugins: PluginFactory<N>[]) => R,
  livelyRoot: () => N,
) {
  it('should allow components hooking to their life-cycle hooks.', done => {
    let bound = false;

    const renderer = factory();
    function F(this: LiveComponentThis) {
      this.onBind(() => bound = true);
      this.onClear(() => done());

      return renderer.create('whatevs');
    }

    bound.should.be.false;
    const D = renderer.create(F);
    renderer.render(D).on(livelyRoot());
    bound.should.be.true;
    renderer.remove(D);
  });
}
