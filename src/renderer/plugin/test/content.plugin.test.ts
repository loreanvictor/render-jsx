import { should, expect } from 'chai'; should();
import { ContentPlugin, isContentPlugin } from '../content.plugin';
import { Plugin } from '../plugin';


describe('isContentPlugin()', () => {
  it('should return `true` when something is a ContentPlugin.', () => {
    class P extends Plugin<any> implements ContentPlugin<any>  {
      setContent(node: any, target: any): boolean {
        throw new Error('Method not implemented.');
      }
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isContentPlugin(new P()).should.be.true;
  });

  it('should return `false` when something is a ContentPlugin.', () => {
    class P extends Plugin<any> {
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isContentPlugin(new P()).should.be.false;
  });
});