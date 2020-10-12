import { CommonDOMRenderer } from '../index';
import { RendererLike } from '../../renderer';
import { testAppendExtensibility } from '../../renderer/test/spec/append.spec';
import { testContentExtensibility } from '../../renderer/test/spec/content.spec';
import { testCreateExtensibility } from '../../renderer/test/spec/create.spec';
import { testFragmentExtensibility } from '../../renderer/test/spec/fragment.spec';
import { testLeafExtensibility } from '../../renderer/test/spec/leaf.spec';
import { testPostRenderAfterExtensibility, testPostRenderBeforeExtensibility, testPostRenderOnExtensibility } from '../../renderer/test/spec/post-render.spec';
import { testPropExtensibility } from '../../renderer/test/spec/prop.spec';
import { testFunctionalEventHandlerSupport } from '../plugins/test/spec/event-handler.spec';
import { testInputStateBinding } from '../plugins/test/spec/input-state.spec';
import { testOptionObjectValueSupport } from '../plugins/test/spec/object-value.spec';
import { testRefPropSupport } from '../../common/plugins/test/spec/ref.spec';
import { testContentPropSupport } from '../../common/plugins/test/spec/content-prop.spec';

describe('dom', () => {
  require('./renderer.test');
  require('./live-renderer.test');
  require('../plugins/test');

  describe('CommonDOMRenderer', () => {
    testAppendExtensibility<Node, RendererLike<Node>>((...plugins) => new CommonDOMRenderer().plug(...plugins));
    testContentExtensibility<Node, RendererLike<Node>>((...plugins) => new CommonDOMRenderer().plug(...plugins));
    testCreateExtensibility<Node, RendererLike<Node>>((...plugins) => new CommonDOMRenderer().plug(...plugins));
    testFragmentExtensibility<Node, RendererLike<Node>>((...plugins) => new CommonDOMRenderer().plug(...plugins));
    testLeafExtensibility<Node, RendererLike<Node>>((...plugins) => new CommonDOMRenderer().plug(...plugins));
    testPropExtensibility<Node, RendererLike<Node>>((...plugins) => new CommonDOMRenderer().plug(...plugins));
    testPostRenderOnExtensibility<Node, RendererLike<Node>>((...plugins) => new CommonDOMRenderer().plug(...plugins));
    testPostRenderAfterExtensibility<Node, RendererLike<Node>>(
      (...plugins) => new CommonDOMRenderer().plug(...plugins));
    testPostRenderBeforeExtensibility<Node, RendererLike<Node>>(
      (...plugins) => new CommonDOMRenderer().plug(...plugins));

    testRefPropSupport<Node, RendererLike<Node>>((...plugins) => new CommonDOMRenderer().plug(...plugins));
    testContentPropSupport<Node, RendererLike<Node>>(
      (...plugins) => new CommonDOMRenderer().plug(...plugins),
      node => node.textContent
    );

    testFunctionalEventHandlerSupport((dom, ...plugins) => new CommonDOMRenderer(dom).plug(...plugins));
    testInputStateBinding((dom, ...plugins) => new CommonDOMRenderer(dom).plug(...plugins));
    testOptionObjectValueSupport((dom, ...plugins) => new CommonDOMRenderer(dom).plug(...plugins));
  });
});
