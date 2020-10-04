/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */

import { should, expect } from 'chai'; should();
import { AppendPlugin, isAppendPlugin } from '../append.plugin';
import { Plugin } from '../plugin';


describe('isAppendPlugin()', () => {
  it('should return `true` when something is an AppendPlugin.', () => {
    class P extends Plugin<any> implements AppendPlugin<any>  {
      priority(): number {
        throw new Error('Method not implemented.');
      }
      append(target: any, host: any): boolean {
        throw new Error('Method not implemented.');
      }
    }

    isAppendPlugin(new P()).should.be.true;
  });

  it('should return `false` when something is an AppendPlugin.', () => {
    class P extends Plugin<any> {
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isAppendPlugin(new P()).should.be.false;
  });
});
