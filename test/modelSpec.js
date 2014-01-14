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
            expect(values.name).to.equal('');
            expect(values.price).to.equal('');
            expect(values.percent).to.equal('');
            expect(values.date).to.equal('');
            expect(_.keys(values)).to.have.length(4);
        });

        it('Should avoid needing null entries in the schema', function() {
            this.model = new this.AdornModel({
                id: 'c2b97bde-b3cf-4354-aea5-de899e4c3d2d',
                name: 'A Test Model',
                price: 5.1,
                percent: 0.31516,
                date: '2016-01-01'
            });

            var values = this.model.formatted();
            expect(values.id).to.equal(this.model.get('id'));
            expect(values.name).to.equal('A Test Model');
            expect(values.price).to.equal('5.10');
            expect(values.percent).to.equal('32');
            expect(values.date).to.equal('2016-01-01');
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
            expect(values.date).to.equal('2014-06-01');
        });

        it('Should change nulls to null string', function() {
            this.model = new this.AdornModel({
                name: 'A Test Model',
                price: null,
                percent: null,
                date: null,
                other: null
            });

            var values = this.model.formatted();
            expect(values.name).to.equal('A Test Model');
            expect(values.price).to.equal('');
            expect(values.percent).to.equal('');
            expect(values.date).to.equal('');
            expect(values.other).to.equal('');
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
