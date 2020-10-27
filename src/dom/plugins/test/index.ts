import { should, expect } from 'chai';should();
import { domPlugins } from '../index';
import { testFunctionalEventHandlerSupport } from './spec/event-handler.spec';
import { LiveDOMRenderer } from '../../live-renderer';
import { testInputStateBinding } from './spec/input-state.spec';
import { testOptionObjectValueSupport } from './spec/object-value.spec';
import { testStyleObjectSupport } from './spec/style.spec';
import { testClassObjectSupport } from './spec/class.spec';

describe('plugins', () => {
  require('./event-handler.plugin.test');
  require('./input-state.plugin.test');
  require('./object-value.plugin.test');
  require('./class.plugin.test');
  require('./style.plugin.test');

  describe('domPlugins()', () => {
    describe('when plugged into a `LiveDOMRenderer` ...', () => {
      testFunctionalEventHandlerSupport(
        (dom, ...plugins) => new LiveDOMRenderer(dom).plug(...domPlugins(), ...plugins)
      );
      testInputStateBinding((dom, ...plugins) => new LiveDOMRenderer(dom).plug(...domPlugins(), ...plugins));
      testOptionObjectValueSupport((dom, ...plugins) => new LiveDOMRenderer(dom).plug(...domPlugins(), ...plugins));
      testClassObjectSupport((dom, ...plugins) => new LiveDOMRenderer(dom).plug(...domPlugins(), ...plugins));
      testStyleObjectSupport((dom, ...plugins) => new LiveDOMRenderer(dom).plug(...domPlugins(), ...plugins));
    });
  });
});
