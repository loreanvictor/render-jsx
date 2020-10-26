// tslint:disable: no-unused-expression

import { expect, should } from 'chai'; should();
import { JSDOM } from 'jsdom';
import { scanRemove } from '../scan-remove';


describe('scanRemove()', () => {
  it('should remove from given node to given node.', () => {
    const dom = new JSDOM(`<div id="1"></div><div id="2"></div><div id="3"></div><div id="4"></div><div id="5"></div>`);

    const d1 = dom.window.document.getElementById('1');
    const d5 = dom.window.document.getElementById('5');

    scanRemove(d1!!, d5!!);

    d1?.nextSibling!!.should.equal(d5);
  });

  it('should include the initial div as well when the options dictate.', () => {
    const dom = new JSDOM(`<div id="1"></div><div id="2"></div><div id="3"></div><div id="4"></div><div id="5"></div>`);

    const d1 = dom.window.document.getElementById('1');
    const d5 = dom.window.document.getElementById('5');

    scanRemove(d1!!, d5!!, { includeStart: true });

    expect(d5?.previousSibling).to.be.null;
    dom.window.document.body.firstChild!!.should.equal(d5);
  });

  it('should include the end div as well the the options dictate.', () => {
    const dom = new JSDOM(`<div id="1"></div><div id="2"></div><div id="3"></div><div id="4"></div><div id="5"></div>`);

    const d1 = dom.window.document.getElementById('1');
    const d5 = dom.window.document.getElementById('5');

    scanRemove(d1!!, d5!!, { includeEnd: true });

    expect(d1?.nextSibling).to.be.null;
    dom.window.document.body.lastChild!!.should.equal(d1);
  });

  it('should return removed elements.', () => {
    const dom = new JSDOM(`<div id="1"></div><div id="2"></div><div id="3"></div><div id="4"></div><div id="5"></div>`);

    const d1 = dom.window.document.getElementById('1');
    const d2 = dom.window.document.getElementById('2');
    const d3 = dom.window.document.getElementById('3');
    const d4 = dom.window.document.getElementById('4');
    const d5 = dom.window.document.getElementById('5');

    const D = scanRemove(d1!!, d5!!);
    D.should.eql([d2, d3, d4]);
  });

  it('should invoke given callback on removed elements.', () => {
    const dom = new JSDOM(`<div id="1"></div><div id="2"></div><div id="3"></div><div id="4"></div><div id="5"></div>`);
    const D: Node[] = [];

    const d1 = dom.window.document.getElementById('1');
    const d2 = dom.window.document.getElementById('2');
    const d3 = dom.window.document.getElementById('3');
    const d4 = dom.window.document.getElementById('4');
    const d5 = dom.window.document.getElementById('5');

    scanRemove(d1!!, d5!!, { callback: d => D.push(d) });
    D.should.eql([d2, d3, d4]);
  });
});
