/* tslint:disable: no-unused-expression */
import { should, expect } from 'chai'; should();
import { PluginFactory, RendererLike } from '../../../../renderer';
import { ref } from '../../../ref';

export function testRefPropSupport
  <N, R extends RendererLike<N>>(
  factory: (...plugins: PluginFactory<N, R>[]) => R
) {
  it('should resolve given ref on `_ref` prop.', () => {
    const r = factory();
    const _ref = ref<N>();
    const n = r.create('whatevs', {_ref});
    _ref.resolved.should.be.true;
    expect(_ref.$).to.equal(n);
  });
}
