/* tslint:disable: no-unused-expression */
import { should, expect } from 'chai'; should();
import { PluginFactory, RendererLike } from '../../../../renderer';

export function testContentPropSupport
  <N, R extends RendererLike<N>>(
  factory: (...plugins: PluginFactory<N, R>[]) => R,
  getContent: (node: N) => any,
) {
  it('should set given content on `_content` prop on given node.', () => {
    const r = factory();
    const n = r.create('whatevs', {_content: 'Now I become death, the destroyer of worlds.'});
    getContent(n).should.equal('Now I become death, the destroyer of worlds.');
  });
}
