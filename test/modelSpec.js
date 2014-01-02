'use strict';

var expect = require('chai').expect,
    _ = require('underscore'),
    Model = require('model'),
    Formatters = require('formatters');

describe('An extended model', function() {
    describe('A model with a schema', function() {
        beforeEach(function() {
            var AdornModel = this.AdornModel = Model.extend({
                schema: {
                    'name': null,
                    'price': Formatters.cost,
                    'percent': Formatters.percent,
                    'date': Formatters.date
                }
            });
            var model = this.model = new AdornModel();
        });

        it('Should have a formatted method', function() {
            expect(this.model.formatted).to.exist;
        });

        it('Should provide all entries in the schema', function() {
            var values = this.model.formatted();
            expect(values.name).to.equal(null);
            expect(values.price).to.equal(null);
            expect(values.percent).to.equal(null);
            expect(values.date).to.equal(null);
            expect(_.keys(values)).to.have.length(4);
        });

        it('Should correctly apply formatting', function() {
            this.model = new this.AdornModel({
                name: 'A Test Model',
                price: 5.1,
                percent: 0.31516,
                date: '2014-06-01'
            });

            var values = this.model.formatted();
            expect(values.name).to.equal('A Test Model');
            expect(values.price).to.equal('5.10');
            expect(values.percent).to.equal('32');
            expect(values.date).to.equal('6/1/2014');
        });
    });

    describe('A regular Backbone model', function() {
        it('Should use toJSON', function() {
            var BBModel = Model.extend();
            var model = new BBModel({
                name: 'A. Backbone Model',
                phone: '215-555-1212'
            });

            var formatted = model.formatted();
            expect(formatted.name).to.equal('A. Backbone Model');
            expect(formatted.phone).to.equal('215-555-1212');
        });
    });
});
