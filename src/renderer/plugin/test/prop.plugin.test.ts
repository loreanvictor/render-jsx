import { should, expect } from 'chai'; should();
import { PropPlugin, isPropPlugin } from '../prop.plugin';
import { Plugin } from '../plugin';


describe('isPropPlugin()', () => {
  it('should return `true` when something is a PropPlugin.', () => {
    class P extends Plugin<any> implements PropPlugin<any>  {
      setProp(node: any, prop: string, target: any): boolean {
        throw new Error('Method not implemented.');
      }
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isPropPlugin(new P()).should.be.true;
  });

  it('should return `false` when something is a PropPlugin.', () => {
    class P extends Plugin<any> {
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isPropPlugin(new P()).should.be.false;
  });
});