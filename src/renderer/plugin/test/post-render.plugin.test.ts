/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */

import { should, expect } from 'chai'; should();
import { PostRenderPlugin, isPostRenderPlugin } from '../post-render.plugin';
import { Plugin } from '../plugin';


describe('isPostRenderPlugin()', () => {
  it('should return `true` when something is a PostRenderPlugin.', () => {
    class P extends Plugin<any> implements PostRenderPlugin<any>  {
      postRender(node: any): void {
        throw new Error('Method not implemented.');
      }
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isPostRenderPlugin(new P()).should.be.true;
  });

  it('should return `false` when something is a PostRenderPlugin.', () => {
    class P extends Plugin<any> {
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isPostRenderPlugin(new P()).should.be.false;
  });
});