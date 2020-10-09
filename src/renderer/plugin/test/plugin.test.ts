/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */

import { should, expect } from 'chai';import { RendererLike, ToBeRenderered } from '../../types';
 should();
import { isRendererWithPlugins, Plugin } from '../plugin';


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

describe('isRendererWithPlugins', () => {
  it('should be true for renderers that have plugins.', () => {
    class R implements RendererLike<any> {
      append() {}
      setProp() {}
      setContent() {}
      fragment: any;
      leaf() {}
      create() {}
      remove() {}
      render(): ToBeRenderered<any> {
        throw new Error('Method not implemented.');
      }
    }

    class R2 extends R {
      plugins = [];
    }

    isRendererWithPlugins(new R()).should.be.false;
    isRendererWithPlugins(new R2()).should.be.true;
  });
});
