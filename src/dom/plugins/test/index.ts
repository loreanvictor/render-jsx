import { domPlugins } from '../index';
/* tslint:disable: no-unused-expression */
import { should, expect } from 'chai';should();
import { EventHandlerPlugin } from '../event-handler.plugin';
import { InputStatePlugin } from '../input-state.plugin';
import { OptionObjectValuePlugin } from '../object-value.plugin';

describe('plugins', () => {
  require('./event-handler.plugin.test');
  require('./input-state.plugin.test');
  require('./object-value.plugin.test');

  describe('domPlugins()', () => {
    it('should include an event handler plugin.', () => {
      const p = domPlugins().map(_ => _());
      expect(p.find(x => x instanceof EventHandlerPlugin)).to.not.be.undefined;
    });

    it('should include an input state plugin.', () => {
      const p = domPlugins().map(_ => _());
      expect(p.find(x => x instanceof InputStatePlugin)).to.not.be.undefined;
    });

    it('should include an option object value plugin.', () => {
      const p = domPlugins().map(_ => _());
      expect(p.find(x => x instanceof OptionObjectValuePlugin)).to.not.be.undefined;
    });
  });
});
