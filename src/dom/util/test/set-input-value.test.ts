// tslint:disable: no-magic-numbers
// tslint:disable: no-unused-expression

import { expect, should } from 'chai'; should();
import { JSDOM } from 'jsdom';
import { setInputValue, setOptionObjectValue } from '../input-value';

describe('setInputValue()', () => {
  it('should set value of a text input properly.', () => {
    const dom = new JSDOM('<input id="i" type="text"/>');
    const input = dom.window.document.getElementById('i') as HTMLInputElement;
    setInputValue(input, 'hellow');
    input.value.should.equal('hellow');
  });

  it('should set value of a number input properly.', () => {
    const dom = new JSDOM('<input id="i" type="number"/>');
    const input = dom.window.document.getElementById('i') as HTMLInputElement;
    setInputValue(input, 42);
    input.value.should.equal('42');
  });

  it('should set value of a checkbox input properly.', () => {
    const dom = new JSDOM('<input id="i" type="checkbox"/>');
    const input = dom.window.document.getElementById('i') as HTMLInputElement;
    setInputValue(input, true);
    input.checked.should.be.true;
    setInputValue(input, false);
    input.checked.should.be.false;
  });

  it('should set value of a radio input properly.', () => {
    const dom = new JSDOM('<input id="i" type="radio"/>');
    const input = dom.window.document.getElementById('i') as HTMLInputElement;
    setInputValue(input, true);
    input.checked.should.be.true;
    setInputValue(input, false);
    input.checked.should.be.false;
  });

  it('should set value of a text area properly.', () => {
    const dom = new JSDOM('<textarea id="i"/>');
    const input = dom.window.document.getElementById('i') as HTMLInputElement;
    setInputValue(input, 'hola');
    input.value.should.equal('hola');
  });

  it('should set value of a select input properly.', () => {
    const dom = new JSDOM('<select id="i"><option>A</option><option>B</option></select>');
    const input = dom.window.document.getElementById('i') as HTMLSelectElement;
    setInputValue(input, 'B');
    input.value.should.equal('B');
    expect(input.selectedOptions.item(0)?.textContent).to.equal('B');
  });

  it('should set value of a select input properly.', () => {
    const dom = new JSDOM('<select id="i"><option value="aa">A</option><option value="bb">B</option></select>');
    const input = dom.window.document.getElementById('i') as HTMLSelectElement;
    setInputValue(input, 'bb');
    input.value.should.equal('bb');
    expect(input.selectedOptions.item(0)?.textContent).to.equal('B');
  });

  it('should set value of a select input properly.', () => {
    const dom = new JSDOM('<select id="i"><option>A</option><option id="o">B</option></select>');
    const input = dom.window.document.getElementById('i') as HTMLSelectElement;
    const V = {};
    setOptionObjectValue(dom.window.document.getElementById('o') as HTMLOptionElement, V);
    setInputValue(input, V);
    input.value.should.equal('B');
    expect(input.selectedOptions.item(0)?.textContent).to.equal('B');
  });

  it('should set value of a multi-select input properly.', () => {
    const dom = new JSDOM('<select id="i" multiple><option>A</option><option>B</option><option>C</option></select>');
    const input = dom.window.document.getElementById('i') as HTMLSelectElement;
    setInputValue(input, ['B', 'C']);
    expect(input.selectedOptions.item(0)?.textContent).to.equal('B');
    expect(input.selectedOptions.item(1)?.textContent).to.equal('C');
    expect(input.selectedOptions.length).to.equal(2);
  });
});
