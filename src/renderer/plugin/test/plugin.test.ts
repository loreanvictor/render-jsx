import { should, expect } from 'chai'; should();
import { Plugin } from '../plugin';


describe('Plugin', () => {
  describe('.PriorityMax', () => {
    it('should be more than .PriorityFallback', () => {
      Plugin.PriorityMax.should.be.greaterThan(Plugin.PriorityFallback);
    });
  });

  describe('.PriorityFallback', () => {
    it('should be less than .PriorityMax', () => {
      Plugin.PriorityFallback.should.be.lessThan(Plugin.PriorityMax);
    });
  });

  describe('.renderer()', () => {
    it('should throw an error before a renderer is plugged in.', () => {
      class DummyPlugin extends Plugin<any, any> {
        priority(): number {
          return Plugin.PriorityFallback;
        }
      }

      expect(() => new DummyPlugin().renderer()).to.throw();
    });

    it('should not throw an error after a renderer is plugged in.', () => {
      class DummyPlugin extends Plugin<any, any> {
        priority(): number {
          return Plugin.PriorityFallback;
        }
      }

      expect(() => {
        const p = new DummyPlugin();
        p.plug(42 as any);
        p.renderer();
      }).not.to.throw();
    });

    it('should return the plugged in renderer after a renderer is plugged in.', () => {
      class DummyPlugin extends Plugin<any, any> {
        priority(): number {
          return Plugin.PriorityFallback;
        }
      }

      const p = new DummyPlugin();
      p.plug(42 as any);
      p.renderer().should.eql(42);
    });
  });
});