import { should, expect } from 'chai';should();
import { domPlugins } from '../index';
import { testFunctionalEventHandlerSupport } from './spec/event-handler.spec';
import { LiveDOMRenderer } from '../../live-renderer';
import { testInputStateBinding } from './spec/input-state.spec';
import { testOptionObjectValueSupport } from './spec/object-value.spec';

describe('plugins', () => {
  require('./event-handler.plugin.test');
  require('./input-state.plugin.test');
  require('./object-value.plugin.test');

  describe('domPlugins()', () => {
    describe('when plugged into a `LiveDOMRenderer` ...', () => {
      testFunctionalEventHandlerSupport(
        (dom, ...plugins) => new LiveDOMRenderer(dom).plug(...domPlugins(), ...plugins)
      );
      testInputStateBinding((dom, ...plugins) => new LiveDOMRenderer(dom).plug(...domPlugins(), ...plugins));
      testOptionObjectValueSupport((dom, ...plugins) => new LiveDOMRenderer(dom).plug(...domPlugins(), ...plugins));
    });
  });
});
