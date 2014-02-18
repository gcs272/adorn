'use strict';

var expect = require('chai').expect,
    jsdom = require('jsdom'),
    _ = require('underscore'),
    Model = require('model'),
    Formatters = require('formatters');

global.document = global.document || jsdom.jsdom();
global.window = global.window || global.document.createWindow();

var $ = require('jqueryify');

describe('Parsing a nested model', function() {
    beforeEach(function() {
        this.el = $('<form>' +
            '<input type="hidden" name="a_hidden_attr" ' +
                'value="definitely-not-fnord" />' +
            '<input type="text" name="name" value="a name" />' +
            '<input type="text" name="loan.funding.amount" value="5.10" />' +
            '</form>');
        
        this.AdornModel = Model.extend({
            schema: {
                'name': null,
                'loan': {
                    'funding': {
                        'amount': Formatters.cost
                    }
                }
            }
        });

    });

    it('Should parse from a nested form', function() {
        var model = new this.AdornModel();
        var update = model.parseForm(this.el);

        expect(_.keys(update)).to.have.length(2);
        expect(update.name).to.equal('a name');
        expect(update.loan.funding.amount).to.equal(5.1);
    });
});
