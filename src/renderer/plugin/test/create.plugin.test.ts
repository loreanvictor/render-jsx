import { should, expect } from 'chai'; should();
import { CreatePlugin, isCreatePlugin } from '../create.plugin';
import { Plugin } from '../plugin';


describe('isCreatePlugin()', () => {
  it('should return `true` when something is a CreatePlugin.', () => {
    class P extends Plugin<any> implements CreatePlugin<any>  {
      create(tag: any, props?: { [prop: string]: any; }, ...children: any[]) {
        throw new Error('Method not implemented.');
      }
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isCreatePlugin(new P()).should.be.true;
  });

  it('should return `false` when something is a CreatePlugin.', () => {
    class P extends Plugin<any> {
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isCreatePlugin(new P()).should.be.false;
  });
});