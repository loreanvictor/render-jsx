/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */

import { should, expect } from 'chai'; should();
import { PostCreatePlugin, isPostCreatePlugin } from '../post-create.plugin';
import { Plugin } from '../plugin';


describe('isPostCreatePlugin()', () => {
  it('should return `true` when something is a PostCreatePlugin.', () => {
    class P extends Plugin<any> implements PostCreatePlugin<any>  {
      postCreate(node: any): void {
        throw new Error('Method not implemented.');
      }
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isPostCreatePlugin(new P()).should.be.true;
  });

  it('should return `false` when something is a PostCreatePlugin.', () => {
    class P extends Plugin<any> {
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isPostCreatePlugin(new P()).should.be.false;
  });
});