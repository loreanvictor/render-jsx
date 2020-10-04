/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */

import { should, expect } from 'chai';import { Plugin } from '../plugin';
 should();

import { Renderer } from '../renderer';
import { testAppendExtensibility } from './extensibility/append.spec';
import { testContentExtensibility } from './extensibility/content.spec';
import { testPropExtensibility } from './extensibility/prop.spec';
import { testFragmentExtensibility } from './extensibility/fragment.spec';
import { testLeafExtensibility } from './extensibility/leaf.spec';
import { testCreateExtensibility } from './extensibility/create.spec';
import { testPostCreateExtensibility } from './extensibility/post-create.spec';


describe('Renderer', () => {
  class R extends Renderer<any> {
    fallbackAppend(_target: any, _host: any): void {}
    fallbackSetProp(_node: any, _prop: string, _target: any): void {}
    fallbackSetContent(_node: any, _target: any): void {}
    fallbackFragment() {}
    fallbackLeaf() {}
    fallbackCreate(_tag: any, _props?: { [prop: string]: any; }) { return {}; }
    renderOn(_target: any, _host: any): void {}
    renderAfter(_target: any, _ref: any): void {}
    renderBefore(_target: any, _ref: any): void {}
  }

  const factory = (...p: Plugin<any, any>[]) => new R(...p);

  describe('.append()', () => {
    testAppendExtensibility(factory);
  });

  describe('.setProp()', () => {
    testPropExtensibility(factory);
  });

  describe('.setContent()', () => {
    testContentExtensibility(factory);
  });

  describe('.fragment', () => {
    testFragmentExtensibility(factory);
  });

  describe('.leaf()', () => {
    testLeafExtensibility(factory);
  });

  describe('.create()', () => {
    testCreateExtensibility(factory);
    testPostCreateExtensibility(factory);
  });
});
