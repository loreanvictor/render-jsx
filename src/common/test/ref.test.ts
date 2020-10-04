/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */

import { should, expect } from 'chai';import { RefAlreadyResolvedError, UnresolvedRefError } from '../errors';
 should();
import { Ref } from '../ref';


describe('Ref', () => {
  describe('.resolved', () => {
    it('should return `false` if the ref is not resolved.', () => {
      const r = new Ref<number>();
      r.resolved.should.be.false;
    });

    it('should return `true` if the ref is resolved.', () => {
      const r = new Ref<number>();
      r.resolve(42);
      r.resolved.should.be.true;
    });
  });

  describe('.$', () => {
    it('should throw an error when accessed before the ref is resolved.', () => {
      expect(() => new Ref().$).to.throw();
      try {
        new Ref().$;
      } catch(err) {
        err.should.be.instanceOf(UnresolvedRefError);
      }
    });

    it('should return the resolved value after the ref is resolved.', () => {
      const r = new Ref<any>();
      const x = {};
      r.resolve(x);
      r.$.should.eql(x);
    });
  });

  describe('.resolve()', () => {
    it('should resolve the value of the ref, retrievable via .$', () => {
      const r = new Ref<any>();
      const x = {};
      r.resolve(x);
      r.$.should.eql(x);
    });

    it('should throw an error when resolved multiple times.', () => {
      expect(() => {
        const r = new Ref();
        r.resolve(42);
        r.resolve(43);
      }).to.throw();

      try {
        const r = new Ref();
        r.resolve(42);
        r.resolve(43);
      } catch(err) {
        err.should.be.instanceOf(RefAlreadyResolvedError);
      }
    });
  });
});
