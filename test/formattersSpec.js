'use strict';

var _ = require('underscore'),
    formatters = require('formatters'),
    expect = require('chai').expect;

describe('Formatters', function() {
    it('Should format cost', function() {
        expect(formatters.cost(3.00)).to.equal('3.00');
        expect(formatters.cost(3.1)).to.equal('3.10');
        expect(formatters.cost(3.15)).to.equal('3.15');
        expect(formatters.cost(3.156)).to.equal('3.16');
    });

    it('Should format dates', function() {
        expect(formatters.date('2014-06-01')).to.equal('6/1/2014');
        expect(formatters.date('2014-06-01T00:00:00')).to.equal('6/1/2014');
    });

    it('Should format percentages', function() {
        expect(formatters.percent(0.3)).to.equal('30');
        expect(formatters.percent(0.333)).to.equal('33');
        expect(formatters.percent(0.335)).to.equal('34');
    });
});
