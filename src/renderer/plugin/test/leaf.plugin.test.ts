/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */

import { should, expect } from 'chai'; should();
import { LeafPlugin, isLeafPlugin } from '../leaf.plugin';
import { Plugin } from '../plugin';


describe('isLeafPlugin()', () => {
  it('should return `true` when something is a LeafPlugin.', () => {
    class P extends Plugin<any> implements LeafPlugin<any>  {
      leaf() {
        throw new Error('Method not implemented.');
      }
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isLeafPlugin(new P()).should.be.true;
  });

  it('should return `false` when something is a LeafPlugin.', () => {
    class P extends Plugin<any> {
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isLeafPlugin(new P()).should.be.false;
  });
});