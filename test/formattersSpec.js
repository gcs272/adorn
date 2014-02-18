'use strict';

var _ = require('underscore'),
    formatters = require('formatters'),
    expect = require('chai').expect;

describe('Formatters', function() {
    describe('Formatting', function() {
        it('Should format cost', function() {
            expect(formatters.cost.format(3.00)).to.equal('3.00');
            expect(formatters.cost.format(3.1)).to.equal('3.10');
            expect(formatters.cost.format(3.15)).to.equal('3.15');
            expect(formatters.cost.format(3.156)).to.equal('3.16');
        });

        it('Should format dates', function() {
            expect(formatters.date.format('2014-06-01')).to.equal('2014-06-01');
            expect(formatters.date.format('2014-06-01T00:00:00')).to.equal('2014-06-01');
        });

        it('Should format percentages', function() {
            expect(formatters.percent.format(0.3)).to.equal('30');
            expect(formatters.percent.format(0.333)).to.equal('33');
            expect(formatters.percent.format(0.335)).to.equal('34');
        });

        it('Should stringify strings', function() {
            expect(formatters.string.format('hello')).to.equal('hello');
            expect(formatters.string.format(null)).to.equal('');
            expect(formatters.string.format(12)).to.equal('12');
        });
    });

    describe('Parsing', function() {
        it('Should parse cost', function() {
            expect(formatters.cost.parse('3.00')).to.equal(3);
            expect(formatters.cost.parse('3.10')).to.equal(3.1);
            expect(formatters.cost.parse('3.156')).to.equal(3.156);
        });

        it('Should parse dates', function() {
            expect(formatters.date.parse('2013-01-01')).to.equal('2013-01-01');
            expect(formatters.date.parse('1/1/13')).to.equal('2013-01-01');
            expect(formatters.date.parse('01/01/2013')).to.equal('2013-01-01');
        });

        it('Should parse percentages', function() {
            expect(formatters.percent.parse('30')).to.equal(0.3);
            expect(formatters.percent.parse('33')).to.equal(0.33);
            expect(formatters.percent.parse('33.3')).to.equal(0.333);
        });

        it('Should parse strings', function() {
            expect(formatters.string.parse('hello')).to.equal('hello');
            expect(formatters.string.parse('')).to.equal(null);
            expect(formatters.string.parse('12')).to.equal('12');
        });
    });
});
