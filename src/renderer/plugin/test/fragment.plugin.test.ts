import { should, expect } from 'chai'; should();
import { FragmentPlugin, isFragmentPlugin } from '../fragment.plugin';
import { Plugin } from '../plugin';


describe('isFragmentPlugin()', () => {
  it('should return `true` when something is a FragmentPlugin.', () => {
    class P extends Plugin<any> implements FragmentPlugin<any>  {
      fragment() {
        throw new Error('Method not implemented.');
      }
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isFragmentPlugin(new P()).should.be.true;
  });

  it('should return `false` when something is a FragmentPlugin.', () => {
    class P extends Plugin<any> {
      priority(): number {
        throw new Error('Method not implemented.');
      }
    }

    isFragmentPlugin(new P()).should.be.false;
  });
});