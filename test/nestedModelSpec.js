'use strict';

var expect = require('chai').expect,
    Model = require('model'),
    Formatters = require('formatters');

describe('A nested model', function() {
    beforeEach(function() {
        var AdornModel = this.AdornModel = Model.extend({
            schema: {
                'name': null,
                'loan': {
                    'funding': {
                        'amount': Formatters.cost
                    }
                }
            }
        });

        var model = this.model = new AdornModel();
    });

    it('Should format to an empty object', function() {
        var res = this.model.formatted();

        expect(res.name).to.equal('');
        expect(res.loan.funding.amount).to.equal('');
    });

    it('Should deep format values', function() {
        var model = this.model = new this.AdornModel({
            'name': 'a-name',
            'loan': {
                'funding': {
                    'amount': 1.1
                }
            }
        });

        var res = this.model.formatted();
        expect(res.name).to.equal('a-name');
        expect(res.loan.funding.amount).to.equal('1.10');
    });
});

describe('Another nested model with nulls', function() {
    beforeEach(function() {
        var AdornModel = Model.extend({
            schema: {
                name: null,
                address: {
                    address_1: null
                }
            }
        });

        var model = this.model = new AdornModel({
            name: 'a-name',
            address: {
                address_1: 'an-address'
            }
        });
    });

    it('Should format nested values without formatters', function() {
        var res = this.model.formatted();
        expect(res.name).to.equal('a-name');
        expect(res.address.address_1).to.equal('an-address');
    });
});
