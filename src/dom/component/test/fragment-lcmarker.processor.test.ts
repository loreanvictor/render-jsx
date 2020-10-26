/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import { FunctionalComponentPlugin, LiveComponentProcessor } from '../../../component';
import { LiveDOMRenderer } from '../../live-renderer';
import { FragmentLifeCycleMarkerComponentProcessor } from '../fragment-lcmarker.processor';
import { testFragmentLCMarkerSupport } from './spec/fragment-lcmarker.processor.spec';


describe('FragmentLifeCycleMarkerComponentProcessor', () => {
  testFragmentLCMarkerSupport((dom, ...plugins) =>
    new LiveDOMRenderer(dom)
    .plug(() => new FunctionalComponentPlugin<Node, LiveDOMRenderer>())
    .plug(() => new LiveComponentProcessor())
    .plug(() => new FragmentLifeCycleMarkerComponentProcessor())
    .plug(...plugins)
  );
});
